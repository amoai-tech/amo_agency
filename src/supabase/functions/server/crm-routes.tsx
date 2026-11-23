// S06-CRM — Client Management CRUD routes
// Reads/writes to `clients` and `crm_contacts` Supabase tables (no KV store)
// Requires auth for all routes. Uses adminClient for service-level access.
// Auth errors → 401, validation errors → 400, DB errors → 500

import { Hono } from "npm:hono";
import { adminClient } from "./db.tsx";
import { requireAuth } from "./auth.tsx";

const crm = new Hono();
const PREFIX = "/make-server-283466b6";

/**
 * Helper: classify caught errors into proper HTTP status codes.
 * requireAuth throws with "Authentication required" — these are 401.
 * Everything else is an unexpected server error — 500.
 */
function errorResponse(c: any, context: string, error: unknown) {
  const msg = String(error);
  const isAuthError = msg.includes("Authentication required") || msg.includes("Auth validation error") || msg.includes("No Authorization header");
  const status = isAuthError ? 401 : 500;
  console.log(`[CRM] ${context} (${status}): ${msg}`);
  return c.json({ error: context }, status);
}

// ── GET /crm/clients — List all clients ──
crm.get(`${PREFIX}/crm/clients`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const db = adminClient();
    const { data: clients, error } = await db
      .from("clients")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });

    if (error) {
      console.log(`[CRM] List clients error: ${error.message}`);
      return c.json({ error: `Failed to list clients: ${error.message}` }, 500);
    }

    console.log(`[CRM] Listed ${clients?.length || 0} clients`);
    return c.json({ clients: clients || [] });
  } catch (error) {
    return errorResponse(c, "List clients failed", error);
  }
});

// ── GET /crm/clients/:id — Get single client with contacts ──
crm.get(`${PREFIX}/crm/clients/:id`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const id = c.req.param("id");
    const db = adminClient();

    const [clientRes, contactsRes] = await Promise.all([
      db.from("clients").select("*").eq("id", id).eq("user_id", userId).maybeSingle(),
      db.from("crm_contacts").select("*").eq("client_id", id).order("is_primary", { ascending: false }),
    ]);

    if (clientRes.error) {
      console.log(`[CRM] Get client error: ${clientRes.error.message}`);
      return c.json({ error: `Failed to get client: ${clientRes.error.message}` }, 500);
    }

    if (!clientRes.data) {
      return c.json({ error: `Client ${id} not found` }, 404);
    }

    return c.json({
      client: clientRes.data,
      contacts: contactsRes.data || [],
    });
  } catch (error) {
    return errorResponse(c, "Get client failed", error);
  }
});

// ── POST /crm/clients — Create a new client ──
crm.post(`${PREFIX}/crm/clients`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const body = await c.req.json();
    const { name, industry, status, health_score, contact_email, contact_name, revenue, notes } = body;

    if (!name) {
      return c.json({ error: "Client name is required" }, 400);
    }

    const db = adminClient();
    const { data: client, error } = await db
      .from("clients")
      .insert({
        name,
        industry: industry || "",
        status: status || "prospect",
        health_score: health_score || 50,
        contact_email: contact_email || "",
        contact_name: contact_name || "",
        revenue: revenue || 0,
        notes: notes || "",
        created_by: userId,
        user_id: userId,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.log(`[CRM] Create client error: ${error.message}`);
      return c.json({ error: `Failed to create client: ${error.message}` }, 500);
    }

    console.log(`[CRM] Created client: ${client.id} (${name})`);
    return c.json({ client }, 201);
  } catch (error) {
    return errorResponse(c, "Create client failed", error);
  }
});

// ── PUT /crm/clients/:id — Update a client ──
crm.put(`${PREFIX}/crm/clients/:id`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const id = c.req.param("id");
    const body = await c.req.json();

    // Only update fields that are provided
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    const allowedFields = ["name", "industry", "status", "health_score", "contact_email", "contact_name", "revenue", "notes"];
    for (const field of allowedFields) {
      if (body[field] !== undefined) updates[field] = body[field];
    }

    const db = adminClient();
    const { data: client, error } = await db
      .from("clients")
      .update(updates)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      console.log(`[CRM] Update client error: ${error.message}`);
      return c.json({ error: `Failed to update client: ${error.message}` }, 500);
    }

    console.log(`[CRM] Updated client: ${id}`);
    return c.json({ client });
  } catch (error) {
    return errorResponse(c, "Update client failed", error);
  }
});

// ── DELETE /crm/clients/:id — Delete a client ──
crm.delete(`${PREFIX}/crm/clients/:id`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const id = c.req.param("id");
    const db = adminClient();

    // Verify ownership before delete
    const { data: existing } = await db.from("clients").select("id").eq("id", id).eq("user_id", userId).maybeSingle();
    if (!existing) return c.json({ error: "Client not found" }, 404);

    // Delete contacts first (cascade)
    await db.from("crm_contacts").delete().eq("client_id", id).eq("user_id", userId);

    const { error } = await db.from("clients").delete().eq("id", id).eq("user_id", userId);

    if (error) {
      console.log(`[CRM] Delete client error: ${error.message}`);
      return c.json({ error: `Failed to delete client: ${error.message}` }, 500);
    }

    console.log(`[CRM] Deleted client: ${id}`);
    return c.json({ success: true });
  } catch (error) {
    return errorResponse(c, "Delete client failed", error);
  }
});

// ── POST /crm/clients/:id/contacts — Add a contact to a client ──
crm.post(`${PREFIX}/crm/clients/:id/contacts`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const clientId = c.req.param("id");
    const body = await c.req.json();
    const { name, email, role, phone, is_primary } = body;

    if (!name) {
      return c.json({ error: "Contact name is required" }, 400);
    }

    const db = adminClient();
    const { data: owningClient } = await db.from("clients")
      .select("id").eq("id", clientId).eq("user_id", userId).maybeSingle();
    if (!owningClient) return c.json({ error: "Client not found" }, 404);
    const { data: contact, error } = await db
      .from("crm_contacts")
      .insert({
        client_id: clientId,
        name,
        email: email || "",
        role: role || "",
        phone: phone || "",
        is_primary: is_primary || false,
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      console.log(`[CRM] Create contact error: ${error.message}`);
      return c.json({ error: `Failed to create contact: ${error.message}` }, 500);
    }

    console.log(`[CRM] Created contact for client ${clientId}: ${contact.id}`);
    return c.json({ contact }, 201);
  } catch (error) {
    return errorResponse(c, "Create contact failed", error);
  }
});

export { crm };