import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: resultId } = await params;

    if (!resultId) {
      return NextResponse.json({ message: 'Result ID is required' }, { status: 400 });
    }

    const testResult = await prisma.testResult.findUnique({
      where: { id: resultId },
    });

    if (!testResult) {
      return NextResponse.json({ message: 'Result not found' }, { status: 404 });
    }

    return NextResponse.json(testResult);
  } catch (error) {
    console.error('Fetch result error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
