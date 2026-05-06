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
    name: payload.name,
    company: payload.company || null,
    contact_person: payload.contactPerson || null,
    email: payload.email || null,
    phone: payload.phone || null,
    website: payload.website || null,
    logo_url: payload.logoUrl || null,
    description: payload.description || null,
    published: Boolean(payload.published),
    updated_at: new Date().toISOString()
  };

  const { error } = await supabase.from("clients").update(row).eq("id", id);

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

  const { error } = await supabase.from("clients").delete().eq("id", id);

  if (error) {
    return Response.json({ success: false, message: error.message }, { status: 400 });
  }

  return Response.json({ success: true });
}
