import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, budget, objective } = body;

    if (!name || !email || !objective) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Send notification email to owner
    await resend.emails.send({
      from: "AutoPilot Systems <onboarding@resend.dev>",
      to: "autopilotsystem07@gmail.com",
      subject: `🔥 New Project Brief from ${name}`,
      html: `
        <div style="font-family: monospace; background: #060606; color: #d8d8d8; padding: 40px; max-width: 600px;">
          <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 24px; margin-bottom: 24px;">
            <h1 style="color: #ffffff; font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: -1px; margin: 0 0 4px;">
              NEW PROJECT BRIEF
            </h1>
            <p style="color: #555; font-size: 11px; text-transform: uppercase; letter-spacing: 4px; margin: 0;">
              AutoPilot Systems — Lead Notification
            </p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #555; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; width: 140px;">Name</td>
              <td style="padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #fff; font-size: 15px; font-weight: 700;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #555; font-size: 10px; text-transform: uppercase; letter-spacing: 3px;">Email</td>
              <td style="padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #fff; font-size: 15px; font-weight: 700;">
                <a href="mailto:${email}" style="color: #ffffff;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #555; font-size: 10px; text-transform: uppercase; letter-spacing: 3px;">Company</td>
              <td style="padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #fff; font-size: 15px; font-weight: 700;">${company || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #555; font-size: 10px; text-transform: uppercase; letter-spacing: 3px;">Budget</td>
              <td style="padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #fff; font-size: 15px; font-weight: 700;">${budget || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 14px 0; color: #555; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; vertical-align: top; padding-top: 20px;">Project Brief</td>
              <td style="padding: 14px 0; color: #d8d8d8; font-size: 15px; line-height: 1.7; padding-top: 20px;">${objective}</td>
            </tr>
          </table>

          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08);">
            <a href="mailto:${email}" style="display: inline-block; background: #ffffff; color: #000000; padding: 14px 28px; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; text-decoration: none;">
              Reply to ${name} →
            </a>
          </div>

          <p style="margin-top: 32px; color: #333; font-size: 10px; text-transform: uppercase; letter-spacing: 3px;">
            © 2026 AutoPilot Systems · autopilotsystem07@gmail.com
          </p>
        </div>
      `,
    });

    // Send confirmation email to client
    await resend.emails.send({
      from: "AutoPilot Systems <onboarding@resend.dev>",
      to: email,
      subject: "We received your brief — AutoPilot Systems",
      html: `
        <div style="font-family: monospace; background: #060606; color: #d8d8d8; padding: 40px; max-width: 600px;">
          <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 24px; margin-bottom: 24px;">
            <h1 style="color: #ffffff; font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: -1px; margin: 0 0 4px;">
              Brief Received.
            </h1>
            <p style="color: #555; font-size: 11px; text-transform: uppercase; letter-spacing: 4px; margin: 0;">
              AutoPilot Systems
            </p>
          </div>
          <p style="color: #d8d8d8; font-size: 16px; line-height: 1.8; margin: 0 0 24px;">
            Hi ${name},<br/><br/>
            We've received your project brief and our team is reviewing it now.
            Expect a personal response within <strong style="color: #fff;">24 hours</strong>.
          </p>
          <p style="color: #555; font-size: 14px; line-height: 1.7;">
            In the meantime, feel free to reach us directly at<br/>
            <a href="mailto:autopilotsystem07@gmail.com" style="color: #fff;">autopilotsystem07@gmail.com</a>
            &nbsp;or call us at&nbsp;
            <a href="tel:+919934857789" style="color: #fff;">+91 9934857789</a>
          </p>
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08);">
            <p style="color: #333; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; margin: 0;">
              © 2026 AutoPilot Systems
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}