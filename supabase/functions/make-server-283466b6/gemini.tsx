// S01-GEMINI — Gemini AI client utility for Edge Functions
// Handles API calls, caching via ai_cache table, and run logging via ai_run_logs table

import { adminClient } from "./db.tsx";
import { ensureAISchema } from "./ensure-schema.tsx";

const GEMINI_MODEL = "gemini-3-flash-preview";

/** Model tiers for different task complexity levels */
export const GEMINI_MODELS = {
  /** Default — fast, cost-effective for most tasks */
  flash: "gemini-3-flash-preview",
  /** Complex reasoning — roadmap generation, readiness scoring, strategy briefs */
  pro: "gemini-3.1-pro-preview",
  /** Lightweight — simple extraction, cache decisions, quick classification */
  lite: "gemini-3.1-flash-lite-preview",
} as const;

export type GeminiModelTier = keyof typeof GEMINI_MODELS;

function getApiKey(): string {
  const key = Deno.env.get("GEMINI_API_KEY");
  if (!key) throw new Error("GEMINI_API_KEY not configured");
  return key;
}

/** SHA-256 hash of input for cache keying */
async function hashInput(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Check ai_cache table for a previous result */
export async function getCachedResult(
  functionName: string,
  input: Record<string, unknown>
): Promise<unknown | null> {
  try {
    await ensureAISchema();
    const inputStr = JSON.stringify({ fn: functionName, ...input });
    const hash = await hashInput(inputStr);
    const db = adminClient();

    const { data, error } = await db
      .from("ai_cache")
      .select("response")
      .eq("input_hash", hash)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();

    if (error) {
      console.log(`[Gemini] Cache check error: ${error.message}`);
      return null;
    }

    if (data?.response) {
      console.log(`[Gemini] Cache HIT for ${functionName}`);
      return data.response;
    }
    return null;
  } catch (e) {
    console.log(`[Gemini] Cache check exception: ${e}`);
    return null;
  }
}

/** Store result in ai_cache table with TTL via expires_at */
export async function setCachedResult(
  functionName: string,
  input: Record<string, unknown>,
  response: unknown,
  model: string,
  tokensUsed: number,
  ttlHours: number = 24
): Promise<void> {
  try {
    await ensureAISchema();
    const inputStr = JSON.stringify({ fn: functionName, ...input });
    const hash = await hashInput(inputStr);
    const db = adminClient();

    const { error } = await db.from("ai_cache").upsert({
      input_hash: hash,
      response: JSON.parse(JSON.stringify(response ?? null)),
      model,
      tokens_used: tokensUsed,
      expires_at: new Date(Date.now() + ttlHours * 3600000).toISOString(),
    });

    if (error) {
      console.log(`[Gemini] Cache write error: ${error.message}`);
    }
  } catch (e) {
    console.log(`[Gemini] Cache write exception: ${e}`);
  }
}

/** Log an AI run to ai_run_logs table for auditing */
export async function logAIRun(params: {
  sessionId?: string;
  orgId?: string;
  promptType: string;
  model: string;
  tokensUsed: number;
  durationMs: number;
  success: boolean;
  errorMessage?: string;
}): Promise<void> {
  try {
    await ensureAISchema();
    const db = adminClient();

    const { error } = await db.from("ai_run_logs").insert({
      session_id: params.sessionId || null,
      org_id: params.orgId || null,
      prompt_type: params.promptType,
      model: params.model,
      tokens_used: params.tokensUsed,
      duration_ms: params.durationMs,
      success: params.success,
      error_message: params.errorMessage || null,
    });

    if (error) {
      console.log(`[Gemini] Log write error: ${error.message}`);
    }
  } catch (e) {
    console.log(`[Gemini] Log write exception: ${e}`);
  }
}

/** Call Gemini API with a structured prompt, returning parsed JSON */
export async function callGemini(
  functionName: string,
  systemPrompt: string,
  userPrompt: string,
  input: Record<string, unknown> = {},
  sessionId?: string,
  modelTier?: GeminiModelTier,
  responseSchema?: Record<string, unknown>
): Promise<unknown> {
  // Check cache first
  const cached = await getCachedResult(functionName, input);
  if (cached) return cached;

  const apiKey = getApiKey();
  const startMs = Date.now();
  const model = modelTier ? GEMINI_MODELS[modelTier] : GEMINI_MODEL;

  // 30s timeout via AbortController
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30_000);

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const generationConfig: Record<string, unknown> = {
      temperature: 1.0,
      topP: 0.95,
      maxOutputTokens: 4096,
      responseMimeType: "application/json",
    };
    if (responseSchema) {
      generationConfig.responseJsonSchema = responseSchema;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      signal: controller.signal,
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: userPrompt }],
          },
        ],
        generationConfig,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Gemini API error (${response.status}): ${errorText.slice(0, 200)}`
      );
    }

    const data = await response.json();
    const durationMs = Date.now() - startMs;

    // Extract text content from Gemini response
    const textContent =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    let parsed: unknown;
    try {
      parsed = JSON.parse(textContent);
    } catch {
      // If JSON parsing fails, wrap in result object
      parsed = { rawText: textContent };
    }

    // Calculate token usage
    const tokensUsed =
      (data?.usageMetadata?.promptTokenCount || 0) +
      (data?.usageMetadata?.candidatesTokenCount || 0);

    // Log the run to ai_run_logs table
    await logAIRun({
      sessionId,
      promptType: functionName,
      model,
      tokensUsed,
      durationMs,
      success: true,
    });

    // Cache the result in ai_cache table
    const ttlHours = functionName === "analyze-business" ? 24 : 168; // 24h or 7 days
    await setCachedResult(functionName, input, parsed, model, tokensUsed, ttlHours);

    return parsed;
  } catch (error) {
    const durationMs = Date.now() - startMs;
    const errorMsg = error instanceof DOMException && error.name === "AbortError"
      ? "Request timeout (30s)"
      : String(error);
    await logAIRun({
      sessionId,
      promptType: functionName,
      model,
      tokensUsed: 0,
      durationMs,
      success: false,
      errorMessage: errorMsg,
    });
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(`Gemini request timed out after 30s for ${functionName}`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}