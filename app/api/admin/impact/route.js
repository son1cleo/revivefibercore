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

  if (!payload.year) {
    return Response.json({ success: false, message: "Year is required." }, { status: 400 });
  }

  const row = {
    year: Number(payload.year),
    water_saved_liters: Number.isFinite(Number(payload.waterSavedLiters)) ? Number(payload.waterSavedLiters) : 0,
    carbon_saved_kg: Number.isFinite(Number(payload.carbonSavedKg)) ? Number(payload.carbonSavedKg) : 0,
    published: Boolean(payload.published),
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase.from("impact_stats").insert(row).select("id").single();

  if (error) {
    return Response.json({ success: false, message: error.message }, { status: 400 });
  }

  return Response.json({ success: true, id: data.id });
}
