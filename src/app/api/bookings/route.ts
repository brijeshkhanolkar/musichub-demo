import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: session.userId },
      include: { musician: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Bookings error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { musicianId, eventDate, eventType, venue, totalPrice, notes } = await request.json();

    if (!musicianId || !eventDate || !eventType || !venue || !totalPrice) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: session.userId,
        musicianId,
        eventDate: new Date(eventDate),
        eventType,
        venue,
        totalPrice,
        notes,
      },
      include: { musician: true },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Create booking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
