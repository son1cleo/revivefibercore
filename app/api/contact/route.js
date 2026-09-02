import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function validate(payload) {
  const required = ["name", "email", "subject", "message"];

  for (const key of required) {
    if (!payload[key] || typeof payload[key] !== "string") {
      return `${key} is required`;
    }
  }

  return null;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const error = validate(body);

    if (error) {
      return Response.json({ success: false, message: error }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();

    if (!supabase) {
      return Response.json(
        { success: false, message: "Message service is not configured." },
        { status: 500 }
      );
    }

    const { error: insertError } = await supabase.from("contact_messages").insert([
      {
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message
      }
    ]);

    if (insertError) {
      return Response.json({ success: false, message: "Unable to send message at this time." }, { status: 500 });
    }

    return Response.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Unable to send message at this time.",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
