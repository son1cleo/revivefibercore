import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey);
}

export async function POST(req) {
  try {
    const supabase = getSupabaseClient();

    if (!supabase) {
      return Response.json({ error: "Server is missing Supabase configuration" }, { status: 500 });
    }

    const { full_name, email, phone, position, resume_url, cover_letter } = await req.json();

    // Validation
    if (!full_name || !email || !position) {
      return Response.json(
        { error: "Missing required fields: full_name, email, position" },
        { status: 400 }
      );
    }

    // Insert into employment_applications
    const { data, error } = await supabase
      .from("employment_applications")
      .insert([
        {
          full_name,
          email,
          phone: phone || null,
          position,
          resume_url: resume_url || null,
          cover_letter: cover_letter || null,
          status: "applied", // Default status for new applications
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return Response.json({ error: "Failed to submit application" }, { status: 500 });
    }

    return Response.json(
      { message: "Application submitted successfully", id: data[0].id },
      { status: 201 }
    );
  } catch (err) {
    console.error("API error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
