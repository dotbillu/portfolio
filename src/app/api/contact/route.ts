import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { email, message, explanation } = await request.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const rawContent =
      explanation || message || "User wants to connect from portfolio chatbot";

    if (rawContent.length > 1000) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    const emailContent = rawContent.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({
        success: true,
        message: "Contact request received (email disabled)",
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Abhay <abhay@dotbillu.in>",
      to: "abhay@dotbillu.in",
      replyTo: email,
      subject: `New message from ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Request</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <hr>
          <p>${emailContent.replace(/\n/g, "<br>")}</p>
        </div>
      `,
      text: `
New Contact Request

From: ${email}
Date: ${new Date().toLocaleString()}

Message:
${emailContent}
      `,
    });

    await resend.emails.send({
      from: "Abhay <abhay@dotbillu.in>",
      to: email,
      subject: "Thanks for reaching out",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hey 👋</h2>
          <p>Thanks for reaching out — I’ve received your message.</p>
          <p>I’ll get back to you as soon as possible.</p>
          <hr>
          <p><strong>Your message:</strong></p>
          <p>${emailContent.replace(/\n/g, "<br>")}</p>
        </div>
      `,
      text: `
Hey,

Thanks for reaching out — I’ve received your message.

I’ll get back to you soon.

Your message:
${emailContent}

— Abhay
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Contact request sent successfully!",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
