import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendResultEmail } from '@/services/email';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { resultId } = await req.json();

    if (!resultId) {
      return NextResponse.json({ message: 'Result ID is required' }, { status: 400 });
    }

    const testResult = await prisma.testResult.findUnique({
      where: { id: resultId },
    });

    if (!testResult) {
      return NextResponse.json({ message: 'Result not found' }, { status: 404 });
    }

    if (!testResult.email) {
      return NextResponse.json({ message: 'No email address associated with this result' }, { status: 400 });
    }

    // Trigger email service
    const scores = (testResult.scores as any).domains;
    const success = await sendResultEmail({
      email: testResult.email,
      resultId: testResult.id,
      summary: testResult.summary as any,
      scores: scores,
    });

    if (success) {
      await prisma.testResult.update({
        where: { id: resultId },
        data: { emailSent: true },
      });
      return NextResponse.json({ message: 'Email resent successfully' });
    } else {
      return NextResponse.json({ message: 'Failed to resend email' }, { status: 500 });
    }

  } catch (error) {
    console.error('Resend email error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
