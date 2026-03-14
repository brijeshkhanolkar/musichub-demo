import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
  console.warn('CRITICAL: DATABASE_URL is missing in production environment');
}

// HARDCODED FOR TESTING - forces the exact URL we know works locally
let dbUrl = "postgresql://postgres:King007%40bpk123@db.shcodruuvnfykgayzkhj.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1";

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
