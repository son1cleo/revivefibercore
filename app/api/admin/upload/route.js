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

  const formData = await request.formData();
  const file = formData.get("file");
  const bucket = formData.get("bucket") || "work-media";
  const folder = formData.get("folder") || "uploads";

  if (!file || typeof file === "string") {
    return Response.json({ success: false, message: "File is required." }, { status: 400 });
  }

  const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const filename = `${folder}/${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();

  const { error } = await supabase.storage.from(bucket).upload(filename, arrayBuffer, {
    contentType: file.type || "application/octet-stream",
    upsert: false
  });

  if (error) {
    return Response.json({ success: false, message: error.message }, { status: 400 });
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filename);

  return Response.json({ success: true, url: data.publicUrl, path: filename });
}
