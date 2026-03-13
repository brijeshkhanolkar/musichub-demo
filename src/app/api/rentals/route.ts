import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { calculateRentalPrice } from '@/lib/discount';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rentals = await prisma.rental.findMany({
      where: { userId: session.userId },
      include: { rentalItem: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(rentals);
  } catch (error) {
    console.error('Rentals error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { rentalItemId, startDate, endDate, deliveryAddress } = await request.json();

    if (!rentalItemId || !startDate || !endDate) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const item = await prisma.rentalItem.findUnique({ where: { id: rentalItemId } });
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      return NextResponse.json({ error: 'Invalid date range' }, { status: 400 });
    }

    const { total, discount } = calculateRentalPrice(item.pricePerDay, days);

    const rental = await prisma.rental.create({
      data: {
        userId: session.userId,
        rentalItemId,
        startDate: start,
        endDate: end,
        days,
        discount,
        totalPrice: total,
        deliveryAddress,
      },
      include: { rentalItem: true },
    });

    return NextResponse.json(rental, { status: 201 });
  } catch (error) {
    console.error('Create rental error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
