import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
  console.warn('CRITICAL: DATABASE_URL is missing in production environment');
}

let dbUrl = process.env.DATABASE_URL;

// On Vercel, Supabase port 6543 can have IPv6 connection pooler issues
if (dbUrl && dbUrl.includes('.supabase.co')) {
  dbUrl = dbUrl.replace(':6543', ':5432');
  dbUrl = dbUrl.replace('?pgbouncer=true', '');
  dbUrl = dbUrl.replace('&pgbouncer=true', '');
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
