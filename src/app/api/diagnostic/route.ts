import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  const jwtSecret = process.env.JWT_SECRET;

  return NextResponse.json({
    databaseUrlPresent: !!dbUrl,
    databaseUrlLength: dbUrl ? dbUrl.length : 0,
    databaseUrlStart: dbUrl ? dbUrl.substring(0, 10) + '...' : 'NONE',
    jwtSecretPresent: !!jwtSecret,
    nodeEnv: process.env.NODE_ENV,
  });
}
