import { createSupabaseServerClient } from "@/lib/supabase/server";
import { productCategories, workMedia } from "@/lib/content";

export async function getPublishedWorkItems() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { images: workMedia.images, videos: workMedia.videos };
  }

  const { data, error } = await supabase
    .from("work_items")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return { images: workMedia.images, videos: workMedia.videos };
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

export async function getPublishedWorkItemsByCategory(category) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("work_items")
    .select("*")
    .eq("published", true)
    .eq("category", category)
    .order("display_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return null;
  }

  return data
    .filter((item) => item.media_type === "image")
    .map((item) => ({ src: item.media_url, title: item.title }));
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

export async function getAllAdminClients() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data;
}

export async function getAdminClientById(id) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("clients").select("*").eq("id", id).maybeSingle();

  if (error || !data) {
    return null;
  }

  return data;
}

const PRODUCT_CATEGORIES = ["Machine In Production", "Packing & Export", "Wiping Rags", "Sustainable Product Sampling"];

export async function getAllAdminProductItems() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("work_items")
    .select("*")
    .in("category", PRODUCT_CATEGORIES)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data;
}

export async function getAllAdminContactMessages() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data;
}

export async function getPublishedProductColors() {
  const supabase = await createSupabaseServerClient();
  const fallback = productCategories[0].colors;

  if (!supabase) {
    return fallback;
  }

  const { data, error } = await supabase
    .from("product_colors")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: true });

  if (error || !data || data.length === 0) {
    return fallback;
  }

  return data.map((row) => ({ name: row.name, hex: row.hex }));
}

export async function getAllAdminProductColors() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("product_colors")
    .select("*")
    .order("display_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: true });

  if (error) {
    return [];
  }

  return data;
}

export async function getAdminProductColorById(id) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("product_colors").select("*").eq("id", id).maybeSingle();

  if (error || !data) {
    return null;
  }

  return data;
}
