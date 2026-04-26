import { createSupabaseServerClient } from "@/lib/supabase/server";

function isAuthBypassed() {
  return process.env.ADMIN_DISABLE_AUTH === "true" || process.env.NODE_ENV === "development";
}

function allowedEmails() {
  return (process.env.ADMIN_ALLOWED_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function getAdminUser() {
  if (isAuthBypassed()) {
    return {
      id: "local-admin",
      email: process.env.ADMIN_FALLBACK_EMAIL || "admin@revivefibercore.local"
    };
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    return null;
  }

  const allowlist = allowedEmails();

  if (allowlist.length > 0 && !allowlist.includes(user.email.toLowerCase())) {
    return null;
  }

  return user;
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
