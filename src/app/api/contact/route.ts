import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, phone, company, role, project, website } =
      await req.json();

    if (!name || !email || !project) {
      return NextResponse.json(
        { error: "Name, email and project are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service not configured yet." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Website <onboarding@resend.dev>",
      to: "mostafakhaled369852@gmai.com",
      replyTo: email as string,
      subject: `New project request — ${name} (${role || "N/A"})`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "-"}`,
        `Company: ${company || "-"}`,
        `Role: ${role || "-"}`,
        `Website: ${website || "-"}`,
        ``,
        `Project:`,
        `${project}`,
      ].join("\n"),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
