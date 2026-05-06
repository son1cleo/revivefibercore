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

  if (!payload.name) {
    return Response.json({ success: false, message: "Name is required." }, { status: 400 });
  }

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

  const { data, error } = await supabase.from("clients").insert(row).select("id").single();

  if (error) {
    return Response.json({ success: false, message: error.message }, { status: 400 });
  }

  return Response.json({ success: true, id: data.id });
}
