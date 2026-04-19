import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('mode');

    const where: any = {};
    if (mode === 'quick') {
      where.isQuick = true;
    }

    const questions = await prisma.question.findMany({
      where,
      orderBy: { id: 'asc' }, // Ensure consistent order
    });

    // If full mode, shuffle would be nice but consistent is safer for state preservation
    // For now, simple consistent order is fine.

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Fetch questions error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
