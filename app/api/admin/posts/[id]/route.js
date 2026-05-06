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
  const slug = createSlug(payload.slug || payload.title || "post");

  const row = {
    title: payload.title,
    slug,
    excerpt: payload.excerpt || "",
    content: payload.content || "",
    author: payload.author || "Revive Fiber Co Team",
    category: payload.category || "Insights",
    cover_image: payload.coverImage || null,
    published: Boolean(payload.published),
    published_at: payload.published ? payload.publishedAt || new Date().toISOString() : null,
    updated_at: new Date().toISOString()
  };

  const { error } = await supabase.from("blog_posts").update(row).eq("id", id);

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

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    return Response.json({ success: false, message: error.message }, { status: 400 });
  }

  return Response.json({ success: true });
}
