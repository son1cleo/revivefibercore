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

  if (!payload.title || !payload.mediaUrl || !payload.mediaType) {
    return Response.json({ success: false, message: "Title, media URL, and media type are required." }, { status: 400 });
  }

  const row = {
    title: payload.title,
    description: payload.description || "",
    media_type: payload.mediaType,
    media_url: payload.mediaUrl,
    thumbnail_url: payload.thumbnailUrl || null,
    category: payload.category || "General",
    published: Boolean(payload.published),
    display_order: Number.isFinite(payload.displayOrder) ? payload.displayOrder : null,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase.from("work_items").insert(row).select("id").single();

  if (error) {
    return Response.json({ success: false, message: error.message }, { status: 400 });
  }

  return Response.json({ success: true, id: data.id });
}
