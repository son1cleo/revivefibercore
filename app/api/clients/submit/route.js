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

    const { name, company, contact_person, email, phone, website, logo_url, description } =
      await req.json();

    // Validation
    if (!name || !company || !contact_person || !email) {
      return Response.json(
        { error: "Missing required fields: name, company, contact_person, email" },
        { status: 400 }
      );
    }

    // Insert into clients
    const { data, error } = await supabase
      .from("clients")
      .insert([
        {
          name,
          company,
          contact_person,
          email,
          phone: phone || null,
          website: website || null,
          logo_url: logo_url || null,
          description: description || null,
          published: false, // Default to unpublished for admin review
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return Response.json({ error: "Failed to submit profile" }, { status: 500 });
    }

    return Response.json(
      { message: "Profile submitted successfully", id: data[0].id },
      { status: 201 }
    );
  } catch (err) {
    console.error("API error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
