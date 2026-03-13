import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get('genre');
    const search = searchParams.get('search');

    const where: Record<string, unknown> = {};
    if (genre && genre !== 'All') where.genre = genre;
    if (search) where.name = { contains: search, mode: 'insensitive' };

    const musicians = await prisma.musician.findMany({
      where,
      orderBy: { rating: 'desc' },
    });

    return NextResponse.json(musicians);
  } catch (error) {
    console.error('Musicians error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
