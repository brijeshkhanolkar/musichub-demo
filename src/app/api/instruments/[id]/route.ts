import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const instrument = await prisma.rentalItem.findUnique({ where: { id } });
    if (!instrument) {
      return NextResponse.json({ error: 'Instrument not found' }, { status: 404 });
    }
    return NextResponse.json(instrument);
  } catch (error) {
    console.error('Instrument detail error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
