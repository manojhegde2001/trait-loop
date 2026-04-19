import { Resend } from 'resend';

interface EmailData {
  email: string;
  resultId: string;
  summary: Record<string, string>;
  scores: Record<string, number>;
}

export async function sendResultEmail({ email, resultId, summary, scores }: EmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email.');
    return false;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const resultLink = `${baseUrl}/result/${resultId}`;

  const html = `
    <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
      <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 32px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em;">TRAIT<span style="opacity: 0.8;">LOOP</span></h1>
        <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">Your Personality Assessment Results</p>
      </div>
      <div style="padding: 32px; background: white;">
        <h2 style="margin-top: 0; font-size: 20px; color: #0f172a;">Hello,</h2>
        <p style="line-height: 1.6; color: #475569;">Thank you for taking the TraitLoop Big Five assessment. Understanding your traits is the first step toward personal growth and self-awareness.</p>
        
        <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 24px 0;">
          <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b;">Domain Overview</h3>
          <div style="display: grid; gap: 12px;">
            ${Object.entries(summary).map(([domain, category]) => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="font-weight: 600;">${domain}</span>
                <span style="padding: 4px 12px; border-radius: 99px; font-size: 12px; font-weight: 700; ${
                  category === 'High' ? 'background: #dcfce7; color: #166534;' :
                  category === 'Low' ? 'background: #fee2e2; color: #991b1b;' :
                  'background: #dbeafe; color: #1e40af;'
                }">${category}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="text-align: center;">
          <a href="${resultLink}" style="display: inline-block; background: #2563eb; color: white; padding: 16px 32px; border-radius: 12px; font-weight: 700; text-decoration: none; box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39);">View Full Detailed Report</a>
        </div>
        
        <p style="margin-top: 32px; font-size: 13px; color: #94a3b8; text-align: center;">If you didn't request this assessment, please ignore this email.</p>
      </div>
      <div style="background: #f1f5f9; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; font-size: 12px; color: #64748b;">&copy; 2026 TraitLoop Assessment Systems. All rights reserved.</p>
      </div>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'TraitLoop <onboarding@resend.dev>',
      to: email,
      subject: 'Your Big Five Personality Test Results',
      html,
    });

    if (error) {
      console.error('Resend API error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}
