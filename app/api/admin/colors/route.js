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

  if (!payload.name || !payload.hex) {
    return Response.json({ success: false, message: "Name and hex color are required." }, { status: 400 });
  }

  const row = {
    name: payload.name,
    hex: payload.hex,
    display_order: Number.isFinite(payload.displayOrder) ? payload.displayOrder : null,
    published: Boolean(payload.published),
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase.from("product_colors").insert(row).select("id").single();

  if (error) {
    return Response.json({ success: false, message: error.message }, { status: 400 });
  }

  return Response.json({ success: true, id: data.id });
}
