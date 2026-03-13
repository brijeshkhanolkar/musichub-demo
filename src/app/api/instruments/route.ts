import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: Record<string, unknown> = {};
    if (category && category !== 'All') where.category = category;
    if (search) where.name = { contains: search, mode: 'insensitive' };

    const instruments = await prisma.rentalItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(instruments);
  } catch (error) {
    console.error('Instruments error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
