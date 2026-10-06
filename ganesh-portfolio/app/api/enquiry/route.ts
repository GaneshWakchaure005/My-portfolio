import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER?.trim();
    const gmailPass = process.env.GMAIL_APP_PASSWORD?.trim().replace(/\s+/g, "");

    if (!gmailUser || !gmailPass) {
      console.error("Missing Gmail credentials in environment variables.");
      return NextResponse.json(
        { error: "Server mail configuration error. Please try again later." },
        { status: 500 }
      );
    }

    // Create Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    // Send enquiry email to developer
    await transporter.sendMail({
      from: `"${name}" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `Portfolio Enquiry: ${subject}`,
      text: `You have received a new enquiry from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #f59e0b; padding-bottom: 8px; margin-top: 0;">New Portfolio Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <div style="background-color: #f8fafc; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 4px; white-space: pre-wrap;">${message}</div>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Enquiry sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);

    return NextResponse.json(
      { error: "Failed to send enquiry. Please try again later." },
      { status: 500 }
    );
  }
}