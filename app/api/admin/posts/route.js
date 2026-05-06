import { getAdminUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function createSlug(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

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

  if (!payload.title || !payload.content) {
    return Response.json({ success: false, message: "Title and content are required." }, { status: 400 });
  }

  const slug = createSlug(payload.slug || payload.title);

  const row = {
    title: payload.title,
    slug,
    excerpt: payload.excerpt || "",
    content: payload.content,
    author: payload.author || "Revive Fiber Co Team",
    category: payload.category || "Insights",
    cover_image: payload.coverImage || null,
    published: Boolean(payload.published),
    published_at: payload.published ? new Date().toISOString() : null,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase.from("blog_posts").insert(row).select("id").single();

  if (error) {
    return Response.json({ success: false, message: error.message }, { status: 400 });
  }

  return Response.json({ success: true, id: data.id });
}
