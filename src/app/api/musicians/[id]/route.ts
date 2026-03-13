import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const musician = await prisma.musician.findUnique({ where: { id } });
    if (!musician) {
      return NextResponse.json({ error: 'Musician not found' }, { status: 404 });
    }
    return NextResponse.json(musician);
  } catch (error) {
    console.error('Musician detail error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
