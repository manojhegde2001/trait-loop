import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const results = await prisma.testResult.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        emailSent: true,
        timeElapsed: true,
        summary: true,
        createdAt: true,
      }
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Fetch admin results error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
