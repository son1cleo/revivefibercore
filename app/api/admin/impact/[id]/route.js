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
    year: Number(payload.year),
    water_saved_liters: Number.isFinite(Number(payload.waterSavedLiters)) ? Number(payload.waterSavedLiters) : 0,
    carbon_saved_kg: Number.isFinite(Number(payload.carbonSavedKg)) ? Number(payload.carbonSavedKg) : 0,
    published: Boolean(payload.published),
    updated_at: new Date().toISOString()
  };

  const { error } = await supabase.from("impact_stats").update(row).eq("id", id);

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

  const { error } = await supabase.from("impact_stats").delete().eq("id", id);

  if (error) {
    return Response.json({ success: false, message: error.message }, { status: 400 });
  }

  return Response.json({ success: true });
}
