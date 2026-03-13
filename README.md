# MusicHub

MusicHub is a marketplace platform where you can hire talented musicians for your events or rent premium musical instruments. Built with Next.js App Router, Tailwind CSS, and Prisma ORM.

## Features
- **Hire Musicians**: Browse by genre, view pricing and profiles, and book directly.
- **Rent Instruments**: Rent guitars, pianos, and more with automated multi-day discount pricing.
- **User Dashboard**: Manage your bookings and rentals.
- **Admin Panel**: Add and edit musicians, instruments, and manage service requests.

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up the environment variables:
Create a `.env` file with your `DATABASE_URL` (PostgreSQL) and a secret `JWT_SECRET` string.

4. Run database migrations:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
