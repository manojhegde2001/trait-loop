import nodemailer from 'nodemailer';

interface EmailData {
  email: string;
  resultId: string;
  summary: Record<string, string>;
  scores: Record<string, number>;
}

export async function sendResultEmail({ email, resultId, summary, scores }: EmailData) {
  // Check if SMTP is configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP not configured, skipping email.');
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const resultLink = `${baseUrl}/result/${resultId}`;

  const html = `
    <div style="font-family: sans-serif; color: #333;">
      <h2>Your Big Five Personality Test Results</h2>
      <p>Thank you for completing the assessment. Here are your top-level domain scores:</p>
      <ul>
        ${Object.entries(summary).map(([domain, category]) => `
          <li><strong>${domain}:</strong> ${category} (Score: ${scores[domain]})</li>
        `).join('')}
      </ul>
      <p>You can view your detailed facets and explanation at the link below:</p>
      <p><a href="${resultLink}" style="padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px;">View Detailed Results</a></p>
      <hr />
      <p style="font-size: 0.8em; color: #666;">If the button doesn't work, copy and paste this URL: ${resultLink}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"TraitLoop" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your Big Five Personality Test Results',
      html,
    });
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}
