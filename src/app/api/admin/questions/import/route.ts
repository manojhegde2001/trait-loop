import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { parse } from 'csv-parse/sync';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const csvContent = await file.text();
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as Array<{ text: string, domain: string, facet: string, keyed: string }>;

    const validDomains = ['O', 'C', 'E', 'A', 'N'];
    const validKeyed = ['plus', 'minus'];
    const validatedQuestions = [];

    for (const [index, row] of records.entries()) {
      const { text, domain, facet, keyed } = row;

      // Basic validation
      if (!text || !domain || !facet || !keyed) {
        return NextResponse.json({ message: `Row ${index + 1}: Missing required fields` }, { status: 400 });
      }

      if (!validDomains.includes(domain.toUpperCase())) {
        return NextResponse.json({ message: `Row ${index + 1}: Invalid domain ${domain}` }, { status: 400 });
      }

      const facetInt = parseInt(facet);
      if (isNaN(facetInt) || facetInt < 1 || facetInt > 6) {
        return NextResponse.json({ message: `Row ${index + 1}: Facet must be between 1-6` }, { status: 400 });
      }

      const keyedLower = keyed.toLowerCase();
      if (!validKeyed.includes(keyedLower)) {
        return NextResponse.json({ message: `Row ${index + 1}: Keyed must be 'plus' or 'minus'` }, { status: 400 });
      }

      validatedQuestions.push({
        text,
        domain: domain.toUpperCase(),
        facet: facetInt,
        keyed: keyedLower,
      });
    }

    // STRICT Mode: REPLACE_ALL
    await prisma.$transaction([
      prisma.question.deleteMany({}),
      prisma.question.createMany({
        data: validatedQuestions,
      }),
    ]);

    return NextResponse.json({ 
      message: 'Import successful', 
      count: validatedQuestions.length 
    });

  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
