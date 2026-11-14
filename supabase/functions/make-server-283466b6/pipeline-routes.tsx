// S07-PIPELINE — CRM Pipeline CRUD routes (Phase 7)
// Reads/writes to crm_pipelines, crm_stages, crm_deals, crm_interactions
// Uses adminClient for service-level access. Auth via requireAuth.

import { Hono } from "npm:hono";
import { adminClient } from "./db.tsx";
import { requireAuth } from "./auth.tsx";

const pipeline = new Hono();
const PREFIX = "/make-server-283466b6";

function errorResponse(c: any, context: string, error: unknown) {
  const msg = String(error);
  const isAuthError = msg.includes("Authentication required") || msg.includes("Auth validation error") || msg.includes("No Authorization header");
  const status = isAuthError ? 401 : 500;
  console.log(`[Pipeline] ${context} (${status}): ${msg}`);
  return c.json({ error: context }, status);
}

/** Compute days in stage and stale flags */
function enrichDeal(deal: any) {
  const changedAt = new Date(deal.stage_changed_at || deal.created_at);
  const daysInStage = Math.max(
    0,
    Math.floor((Date.now() - changedAt.getTime()) / 86400000)
  );
  return {
    ...deal,
    daysInStage,
    isStale: daysInStage > 7,
    isVeryStale: daysInStage > 14,
  };
}

/** Group deals by expected_close_date month for forecast */
function computeForecast(deals: any[]) {
  const monthMap: Record<string, { weightedValue: number; dealCount: number }> =
    {};

  // Generate next 6 months
  const now = new Date();
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const key = d.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    monthMap[key] = { weightedValue: 0, dealCount: 0 };
  }

  for (const deal of deals) {
    if (!deal.expected_close_date) continue;
    const closeDate = new Date(deal.expected_close_date);
    const key = closeDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    if (!monthMap[key]) monthMap[key] = { weightedValue: 0, dealCount: 0 };
    monthMap[key].weightedValue += (deal.value * deal.probability) / 100;
    monthMap[key].dealCount += 1;
  }

  return Object.entries(monthMap).map(([month, data]) => ({
    month,
    ...data,
    weightedValue: Math.round(data.weightedValue),
  }));
}

// ── GET /crm/pipelines — List all pipelines ──
pipeline.get(`${PREFIX}/crm/pipelines`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const db = adminClient();
    const { data: pipelines, error } = await db
      .from("crm_pipelines")
      .select("*")
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: true });

    if (error) {
      console.log(`[Pipeline] List pipelines error: ${error.message}`);
      return c.json(
        { error: `Failed to list pipelines: ${error.message}` },
        500
      );
    }

    // Enrich with deal counts — batch query instead of N+1 loop
    const pipelineIds = (pipelines || []).map((p: any) => p.id);
    if (pipelineIds.length > 0) {
      // Single query: get all stages for all pipelines
      const { data: allStages } = await db
        .from("crm_stages")
        .select("id, pipeline_id")
        .in("pipeline_id", pipelineIds);

      const allStageIds = (allStages || []).map((s: any) => s.id);

      // Single query: count deals per stage
      let dealsByStage: Record<string, number> = {};
      if (allStageIds.length > 0) {
        const { data: deals } = await db
          .from("crm_deals")
          .select("stage_id")
          .eq("user_id", userId)
          .in("stage_id", allStageIds);
        for (const d of deals || []) {
          dealsByStage[d.stage_id] = (dealsByStage[d.stage_id] || 0) + 1;
        }
      }

      // Build pipeline → stage → deal count mapping
      const stagesByPipeline: Record<string, string[]> = {};
      for (const s of allStages || []) {
        if (!stagesByPipeline[s.pipeline_id]) stagesByPipeline[s.pipeline_id] = [];
        stagesByPipeline[s.pipeline_id].push(s.id);
      }

      for (const p of pipelines || []) {
        const pStageIds = stagesByPipeline[p.id] || [];
        (p as any).dealCount = pStageIds.reduce((sum: number, sid: string) => sum + (dealsByStage[sid] || 0), 0);
      }
    } else {
      for (const p of pipelines || []) {
        (p as any).dealCount = 0;
      }
    }

    console.log(`[Pipeline] Listed ${pipelines?.length || 0} pipelines`);
    return c.json({ pipelines: pipelines || [] });
  } catch (error) {
    return errorResponse(c, "List pipelines failed", error);
  }
});

// ── GET /crm/pipelines/:id — Full pipeline data (stages + deals + forecast) ──
pipeline.get(`${PREFIX}/crm/pipelines/:id`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const pipelineId = c.req.param("id");
    const db = adminClient();

    // 1. Get pipeline
    const { data: pipelineData, error: pipelineErr } = await db
      .from("crm_pipelines")
      .select("*")
      .eq("id", pipelineId)
      .maybeSingle();

    if (pipelineErr || !pipelineData) {
      return c.json({ error: "Pipeline not found" }, 404);
    }

    // 2. Get stages ordered by position
    const { data: stages, error: stagesErr } = await db
      .from("crm_stages")
      .select("*")
      .eq("pipeline_id", pipelineId)
      .order("position", { ascending: true });

    if (stagesErr) {
      return c.json(
        { error: `Failed to fetch stages: ${stagesErr.message}` },
        500
      );
    }

    const stageIds = (stages || []).map((s: any) => s.id);

    // 3. Get all deals in this pipeline's stages
    let deals: any[] = [];
    if (stageIds.length > 0) {
      const { data: dealsData, error: dealsErr } = await db
        .from("crm_deals")
        .select("*")
        .eq("user_id", userId)
        .in("stage_id", stageIds)
        .order("created_at", { ascending: false });

      if (dealsErr) {
        console.log(`[Pipeline] Deals fetch error: ${dealsErr.message}`);
      }
      deals = dealsData || [];
    }

    // 4. Enrich deals with contact/client names
    const contactIds = [
      ...new Set(deals.filter((d) => d.contact_id).map((d) => d.contact_id)),
    ];
    const clientIds = [
      ...new Set(deals.filter((d) => d.client_id).map((d) => d.client_id)),
    ];

    let contactMap: Record<string, any> = {};
    let clientMap: Record<string, any> = {};

    if (contactIds.length > 0) {
      const { data: contacts } = await db
        .from("crm_contacts")
        .select("id, name, email")
        .eq("user_id", userId)
        .in("id", contactIds);
      for (const c of contacts || []) {
        contactMap[c.id] = c;
      }
    }

    if (clientIds.length > 0) {
      const { data: clients } = await db
        .from("clients")
        .select("id, name")
        .eq("user_id", userId)
        .in("id", clientIds);
      for (const c of clients || []) {
        clientMap[c.id] = c;
      }
    }

    const enrichedDeals = deals.map((deal) => {
      const contact = deal.contact_id ? contactMap[deal.contact_id] : null;
      const client = deal.client_id ? clientMap[deal.client_id] : null;
      return enrichDeal({
        ...deal,
        contact_name: contact?.name || null,
        contact_email: contact?.email || null,
        client_name: client?.name || null,
      });
    });

    // 5. Compute stage aggregates
    const enrichedStages = (stages || []).map((stage: any) => {
      const stageDeals = enrichedDeals.filter(
        (d: any) => d.stage_id === stage.id
      );
      return {
        ...stage,
        dealCount: stageDeals.length,
        totalValue: stageDeals.reduce(
          (sum: number, d: any) => sum + (d.value || 0),
          0
        ),
      };
    });

    // 6. Compute forecast from active (non-terminal) deals
    const activeStageIds = (stages || [])
      .filter((s: any) => !s.is_closed_won && !s.is_closed_lost)
      .map((s: any) => s.id);
    const activeDeals = enrichedDeals.filter((d: any) =>
      activeStageIds.includes(d.stage_id)
    );
    const forecast = computeForecast(activeDeals);

    console.log(
      `[Pipeline] Pipeline ${pipelineId}: ${enrichedStages.length} stages, ${enrichedDeals.length} deals`
    );

    return c.json({
      pipeline: pipelineData,
      stages: enrichedStages,
      deals: enrichedDeals,
      forecast,
    });
  } catch (error) {
    return errorResponse(c, "Get pipeline failed", error);
  }
});

// ── POST /crm/deals — Create a new deal ──
pipeline.post(`${PREFIX}/crm/deals`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const body = await c.req.json();
    const {
      pipeline_id,
      stage_id,
      title,
      value,
      probability,
      contact_id,
      client_id,
      expected_close_date,
      notes,
    } = body;

    if (!title || !pipeline_id || !stage_id) {
      return c.json(
        { error: "title, pipeline_id, and stage_id are required" },
        400
      );
    }

    const db = adminClient();
    // Pipeline/stage definitions are shared, but deals and client references are private.
    const { data: stage } = await db.from("crm_stages")
      .select("id").eq("id", stage_id).eq("pipeline_id", pipeline_id).maybeSingle();
    if (!stage) return c.json({ error: "Stage does not belong to pipeline" }, 400);
    if (client_id) {
      const { data: client } = await db.from("clients")
        .select("id").eq("id", client_id).eq("user_id", userId).maybeSingle();
      if (!client) return c.json({ error: "Client not found" }, 404);
    }
    if (contact_id) {
      const { data: contact } = await db.from("crm_contacts")
        .select("id, client_id").eq("id", contact_id).eq("user_id", userId).maybeSingle();
      if (!contact || (client_id && contact.client_id !== client_id)) {
        return c.json({ error: "Contact not found or does not belong to client" }, 404);
      }
    }
    const { data: deal, error } = await db
      .from("crm_deals")
      .insert({
        pipeline_id,
        stage_id,
        title,
        value: value || 0,
        probability: probability ?? 0,
        contact_id: contact_id || null,
        client_id: client_id || null,
        expected_close_date: expected_close_date || null,
        notes: notes || "",
        stage_changed_at: new Date().toISOString(),
        owner_id: userId,
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      console.log(`[Pipeline] Create deal error: ${error.message}`);
      return c.json(
        { error: `Failed to create deal: ${error.message}` },
        500
      );
    }

    console.log(`[Pipeline] Created deal: ${deal.id} (${title})`);
    return c.json({ deal: enrichDeal(deal) }, 201);
  } catch (error) {
    return errorResponse(c, "Create deal failed", error);
  }
});

// ── PUT /crm/deals/:id — Update a deal (stage move, value, probability, etc.) ──
pipeline.put(`${PREFIX}/crm/deals/:id`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const dealId = c.req.param("id");
    const body = await c.req.json();
    const db = adminClient();
    const { data: original } = await db.from("crm_deals")
      .select("id, pipeline_id").eq("id", dealId).eq("user_id", userId).maybeSingle();
    if (!original) return c.json({ error: "Deal not found" }, 404);

    const updates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    const allowedFields = [
      "stage_id",
      "title",
      "value",
      "probability",
      "contact_id",
      "client_id",
      "expected_close_date",
      "notes",
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) updates[field] = body[field];
    }

    if (body.stage_id) {
      const { data: stage } = await db.from("crm_stages")
        .select("id").eq("id", body.stage_id).eq("pipeline_id", original.pipeline_id).maybeSingle();
      if (!stage) return c.json({ error: "Stage does not belong to deal's pipeline" }, 400);
      updates.stage_changed_at = new Date().toISOString();
    }
    for (const [table, id] of [["clients", body.client_id], ["crm_contacts", body.contact_id]] as const) {
      if (id) {
        const { data: own } = await db.from(table)
          .select("id").eq("id", id).eq("user_id", userId).maybeSingle();
        if (!own) return c.json({ error: "Related record not found" }, 404);
      }
    }

    const { data: deal, error } = await db
      .from("crm_deals")
      .update(updates)
      .eq("id", dealId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      console.log(`[Pipeline] Update deal error: ${error.message}`);
      return c.json(
        { error: `Failed to update deal: ${error.message}` },
        500
      );
    }

    console.log(`[Pipeline] Updated deal: ${dealId}`);
    return c.json({ deal: enrichDeal(deal) });
  } catch (error) {
    return errorResponse(c, "Update deal failed", error);
  }
});

// ── GET /crm/deals/:id — Get deal detail with interactions ──
pipeline.get(`${PREFIX}/crm/deals/:id`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const dealId = c.req.param("id");
    const db = adminClient();

    // Get deal
    const { data: deal, error: dealErr } = await db
      .from("crm_deals")
      .select("*")
      .eq("id", dealId)
      .eq("user_id", userId)
      .maybeSingle();

    if (dealErr || !deal) {
      return c.json({ error: "Deal not found" }, 404);
    }

    // Get interactions
    const { data: interactions } = await db
      .from("crm_interactions")
      .select("*")
      .eq("deal_id", dealId)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    // Get contact if linked
    let contact = null;
    if (deal.contact_id) {
      const { data: contactData } = await db
        .from("crm_contacts")
        .select("id, name, email, phone, role")
        .eq("id", deal.contact_id)
        .eq("user_id", userId)
        .maybeSingle();
      contact = contactData;
    }

    // Get client name if linked
    let client_name = null;
    if (deal.client_id) {
      const { data: clientData } = await db
        .from("clients")
        .select("name")
        .eq("id", deal.client_id)
        .eq("user_id", userId)
        .maybeSingle();
      client_name = clientData?.name || null;
    }

    return c.json({
      deal: enrichDeal({
        ...deal,
        contact_name: contact?.name || null,
        contact_email: contact?.email || null,
        client_name,
      }),
      contact,
      interactions: interactions || [],
    });
  } catch (error) {
    return errorResponse(c, "Get deal detail failed", error);
  }
});

// ── DELETE /crm/deals/:id — Delete a deal ──
pipeline.delete(`${PREFIX}/crm/deals/:id`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const dealId = c.req.param("id");
    const db = adminClient();

    const { data: existing } = await db.from("crm_deals")
      .select("id").eq("id", dealId).eq("user_id", userId).maybeSingle();
    if (!existing) return c.json({ error: "Deal not found" }, 404);
    await db.from("crm_interactions").delete().eq("deal_id", dealId).eq("user_id", userId);
    const { error } = await db.from("crm_deals").delete().eq("id", dealId).eq("user_id", userId);

    if (error) {
      console.log(`[Pipeline] Delete deal error: ${error.message}`);
      return c.json(
        { error: `Failed to delete deal: ${error.message}` },
        500
      );
    }

    console.log(`[Pipeline] Deleted deal: ${dealId}`);
    return c.json({ success: true });
  } catch (error) {
    return errorResponse(c, "Delete deal failed", error);
  }
});

// ── POST /crm/interactions — Log a new interaction ──
pipeline.post(`${PREFIX}/crm/interactions`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const body = await c.req.json();
    const { deal_id, type, summary } = body;

    if (!deal_id || !type || !summary) {
      return c.json(
        { error: "deal_id, type, and summary are required" },
        400
      );
    }

    const validTypes = ["call", "email", "meeting", "note"];
    if (!validTypes.includes(type)) {
      return c.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(", ")}` },
        400
      );
    }

    const db = adminClient();
    const { data: ownDeal } = await db.from("crm_deals")
      .select("id").eq("id", deal_id).eq("user_id", userId).maybeSingle();
    if (!ownDeal) return c.json({ error: "Deal not found" }, 404);
    const { data: interaction, error } = await db
      .from("crm_interactions")
      .insert({
        deal_id,
        type,
        summary,
        created_by: userId,
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      console.log(`[Pipeline] Create interaction error: ${error.message}`);
      return c.json(
        { error: `Failed to log interaction: ${error.message}` },
        500
      );
    }

    console.log(`[Pipeline] Logged interaction for deal ${deal_id}: ${type}`);
    return c.json({ interaction }, 201);
  } catch (error) {
    return errorResponse(c, "Log interaction failed", error);
  }
});

// ── GET /crm/deals/:id/interactions — Get interactions for a deal ──
pipeline.get(`${PREFIX}/crm/deals/:id/interactions`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const dealId = c.req.param("id");
    const db = adminClient();
    const { data: ownDeal } = await db.from("crm_deals")
      .select("id").eq("id", dealId).eq("user_id", userId).maybeSingle();
    if (!ownDeal) return c.json({ error: "Deal not found" }, 404);

    const { data: interactions, error } = await db
      .from("crm_interactions")
      .select("*")
      .eq("deal_id", dealId)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      return c.json(
        { error: `Failed to fetch interactions: ${error.message}` },
        500
      );
    }

    return c.json({ interactions: interactions || [] });
  } catch (error) {
    return errorResponse(c, "Get interactions failed", error);
  }
});

// ── GET /crm/contacts — List all contacts (for deal creation dropdown) ──
pipeline.get(`${PREFIX}/crm/contacts`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const db = adminClient();
    const { data: contacts, error } = await db
      .from("crm_contacts")
      .select("id, name, email, client_id, role")
      .eq("user_id", userId)
      .order("name", { ascending: true });

    if (error) {
      return c.json(
        { error: `Failed to list contacts: ${error.message}` },
        500
      );
    }

    return c.json({ contacts: contacts || [] });
  } catch (error) {
    return errorResponse(c, "List contacts failed", error);
  }
});

export { pipeline };