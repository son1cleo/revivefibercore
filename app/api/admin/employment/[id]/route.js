import { getAdminUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function PATCH(request, context) {
  const { id } = await context.params;
  const user = await getAdminUser();

  if (!user) {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return Response.json({ success: false, message: "Supabase is not configured." }, { status: 500 });
  }

  const payload = await request.json();

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

  const { error } = await supabase.from("employment_applications").update(row).eq("id", id);

  if (error) {
    return Response.json({ success: false, message: error.message }, { status: 400 });
  }

  return Response.json({ success: true });
}

export async function DELETE(_request, context) {
  const { id } = await context.params;
  const user = await getAdminUser();

  if (!user) {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return Response.json({ success: false, message: "Supabase is not configured." }, { status: 500 });
  }

  const { error } = await supabase.from("employment_applications").delete().eq("id", id);

  if (error) {
    return Response.json({ success: false, message: error.message }, { status: 400 });
  }

  return Response.json({ success: true });
}
