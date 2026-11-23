// S02-AUTH — Authentication utilities for Edge Functions
// Signup, session validation, user extraction

import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

function getServiceClient() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

/** Extract user ID from Authorization header */
export async function getUserFromToken(
  authHeader: string | null
): Promise<{ userId: string | null; error: string | null }> {
  if (!authHeader) {
    return { userId: null, error: "No Authorization header provided" };
  }

  // Case-insensitive "Bearer " prefix removal (HTTP headers are case-insensitive)
  const token = authHeader.replace(/^Bearer\s+/i, "");

  if (!token) {
    return { userId: null, error: "Empty token in Authorization header" };
  }
  
  // Check if this is the anon key (public unauthenticated access)
  // Primary: decode JWT payload and check for role === "anon" (reliable
  // regardless of env-var whitespace / encoding differences).
  // Fallback: exact string comparison with trimmed SUPABASE_ANON_KEY env var.
  try {
    const parts = token.split(".");
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]));
      if (payload.role === "anon") {
        return { userId: "anonymous", error: null };
      }
    }
  } catch {
    // Not a decodable JWT — fall through to other checks
  }

  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")?.trim();
  if (anonKey && token.trim() === anonKey) {
    return { userId: "anonymous", error: null };
  }

  const supabase = getServiceClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return {
      userId: null,
      error: `Auth validation error: ${error?.message || "Invalid token"}`,
    };
  }
  return { userId: user.id, error: null };
}

/** Require authenticated user — returns userId or throws */
export async function requireAuth(
  authHeader: string | null
): Promise<string> {
  const { userId, error } = await getUserFromToken(authHeader);
  if (!userId || userId === "anonymous") {
    throw new Error(error || "Authentication required");
  }
  return userId;
}