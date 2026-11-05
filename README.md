# Pennsa Perfumes storefront

Next.js 15 + Prisma (PostgreSQL) + Tailwind.

```bash
npm install
cp .env.example .env        # set DATABASE_URL
npx prisma db push          # create tables (new fields: brand, tagline, family, notes, badge)
npm run db:seed             # loads the 5 perfumes (placeholder names/prices)
npm run dev
```

Important: the schema changed from the old Achique version (removed madeToOrder/leadTimeDays, added perfume fields + Subscriber).
Use a fresh database or run `npx prisma db push --force-reset` (this deletes existing data).

Edit placeholders in `prisma/seed.ts` (products/prices in cents) and `lib/site.ts` (address, WhatsApp, Instagram).
Logo: `public/brand/logo.png` (replace with a higher-resolution file when you have one).
