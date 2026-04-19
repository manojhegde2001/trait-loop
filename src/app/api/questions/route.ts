import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; 

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      orderBy: { id: 'asc' }, // Ensure consistent order
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Fetch questions error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
