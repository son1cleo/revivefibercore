import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
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
