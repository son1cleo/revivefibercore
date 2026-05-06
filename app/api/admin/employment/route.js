import { getAdminUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request) {
  const user = await getAdminUser();

  if (!user) {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return Response.json({ success: false, message: "Supabase is not configured." }, { status: 500 });
  }

  const payload = await request.json();

  if (!payload.fullName || !payload.email) {
    return Response.json({ success: false, message: "Full name and email are required." }, { status: 400 });
  }

  const row = {
    full_name: payload.fullName,
    email: payload.email,
    phone: payload.phone || null,
    position: payload.position || null,
    resume_url: payload.resumeUrl || null,
    cover_letter: payload.coverLetter || null,
    status: payload.status || "applied",
    notes: payload.notes || null,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase.from("employment_applications").insert(row).select("id").single();

  if (error) {
    return Response.json({ success: false, message: error.message }, { status: 400 });
  }

  return Response.json({ success: true, id: data.id });
}
