import nodemailer from "nodemailer";

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

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
      return Response.json(
        {
          success: false,
          message: "Email service is not configured. Please set SMTP environment variables."
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `Revive Fiber Co <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: body.email,
      subject: `[Website Contact] ${body.subject}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`
    });

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
