import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { calculateScores } from '@/services/scoring';
import { sendResultEmail } from '@/services/email';

const testSchema = z.object({
  answers: z.record(z.string(), z.number().min(1).max(5)),
  email: z.string().email().optional().or(z.literal('')),
  sendEmail: z.boolean().optional(),
  timeElapsed: z.number().int(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = testSchema.parse(body);

    // 1. Fetch all questions involved in the answers
    const questionIds = Object.keys(validated.answers);
    const questions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
    });

    if (questions.length === 0) {
      return NextResponse.json({ message: 'No questions found for provided answers' }, { status: 400 });
    }

    // 2. Compute scores and summary
    const { domains, facets, summary } = calculateScores(validated.answers, questions);

    // 3. Save everything to DB
    const result = await prisma.testResult.create({
      data: {
        answers: validated.answers,
        scores: { domains, facets },
        summary: summary,
        email: validated.email || null,
        timeElapsed: validated.timeElapsed,
        emailSent: false,
      },
    });

    // 4. Trigger async email (non-blocking)
    if (validated.email && validated.sendEmail) {
      // We don't await this to keep the API response fast
      sendResultEmail({
        email: validated.email,
        resultId: result.id,
        summary: summary,
        scores: domains,
      }).then(async (success) => {
        if (success) {
          await prisma.testResult.update({
            where: { id: result.id },
            data: { emailSent: true },
          });
        }
      });
    }

    return NextResponse.json({ testId: result.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }
    console.error('Test submission error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
