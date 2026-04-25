import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { openDb } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, company, email, subject, budget, message } = data;

    // Fetch the target email from the database
    const db = await openDb();
    const dbResult = await db.execute('SELECT email FROM contact_settings WHERE id = 1');
    const toEmail = (dbResult.rows.length > 0 ? dbResult.rows[0].email : process.env.SMTP_USER) as string;

    // Setup Nodemailer transporter
    // Ensure you have SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in your .env.local file
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS, 
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER || toEmail}>`, // sender address
      replyTo: email,
      to: toEmail, // list of receivers
      subject: `New Contact Form Submission: ${subject}`, // Subject line
      text: `
You have received a new message from your portfolio contact form.

Name: ${name}
Email: ${email}
Company/Project: ${company || "N/A"}
Budget: ${budget}

Message:
${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company/Project:</strong> ${company || "N/A"}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\\n/g, '<br/>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send message. Check SMTP configuration." }, { status: 500 });
  }
}
