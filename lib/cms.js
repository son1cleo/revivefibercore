import { getAllBlogPosts, getBlogBySlug } from "@/lib/blog";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function normalizeBlogRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.published_at || row.created_at,
    category: row.category || "Insights",
    author: row.author || "Revive Fiber Core Team",
    excerpt: row.excerpt || "",
    content: row.content || "",
    coverImage: row.cover_image || "",
    published: Boolean(row.published),
    publishedAt: row.published_at || null
  };
}

export async function getPublishedBlogs() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return getAllBlogPosts();
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    return getAllBlogPosts();
  }

  return data.map(normalizeBlogRow);
}

export async function getPublishedBlogBySlug(slug) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return getBlogBySlug(slug);
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) {
    return getBlogBySlug(slug);
  }

  return normalizeBlogRow(data);
}

export async function getAllAdminBlogs() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return getAllBlogPosts();
  }

  const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data.map(normalizeBlogRow);
}

export async function getAdminBlogById(id) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();

  if (error || !data) {
    return null;
  }

  return {
    ...normalizeBlogRow(data),
    published: Boolean(data.published),
    publishedAt: data.published_at
  };
}

export async function getPublishedWorkItems() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { images: [], videos: [] };
  }

  const { data, error } = await supabase
    .from("work_items")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return { images: [], videos: [] };
  }

  return {
    images: data
      .filter((item) => item.media_type === "image")
      .map((item) => ({
        id: item.id,
        title: item.title,
        src: item.media_url
      })),
    videos: data
      .filter((item) => item.media_type === "video")
      .map((item) => ({
        id: item.id,
        title: item.title,
        embedUrl: item.media_url,
        thumbnailUrl: item.thumbnail_url || ""
      }))
  };
}

export async function getAllAdminWorkItems() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("work_items").select("*").order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data;
}

export async function getAdminWorkById(id) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("work_items").select("*").eq("id", id).maybeSingle();

  if (error || !data) {
    return null;
  }

  return data;
}
