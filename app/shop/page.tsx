import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Shop" };

const families = [
  { slug: "floral", label: "Floral" }, { slug: "oud", label: "Oud & woody" }, { slug: "citrus", label: "Citrus & spicy" }, { slug: "amber", label: "Amber & vanilla" },
];

export default async function Shop({ searchParams }: { searchParams: Promise<{ collection?: string; family?: string; q?: string }> }) {
  const { collection, family, q } = await searchParams;
  const where: Prisma.ProductWhereInput = {};
  if (collection) where.collection = { slug: collection };
  if (family) where.family = family;
  if (q) where.OR = [{ name: { contains: q, mode: "insensitive" } }, { brand: { contains: q, mode: "insensitive" } }];

  const [collections, products] = await Promise.all([
    db.collection.findMany(),
    db.product.findMany({ where, orderBy: { createdAt: "desc" }, include: { variants: true } }),
  ]);
  const chip = (active: boolean) => `chip ${active ? "chip-active" : ""}`;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
      <p className="eyebrow">Pennsa Perfumes</p>
      <h1 className="mt-2 text-5xl">Shop <em>fragrances</em></h1>

      <form className="mt-8 flex max-w-md gap-2">
        <input name="q" defaultValue={q} placeholder="Search by name or brand…" className="field" />
        <button className="btn-wine">Search</button>
      </form>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/shop" className={chip(!collection && !family && !q)}>All</Link>
        {collections.map((c) => <Link key={c.id} href={`/shop?collection=${c.slug}`} className={chip(collection === c.slug)}>{c.name}</Link>)}
        {families.map((f) => <Link key={f.slug} href={`/shop?family=${f.slug}`} className={chip(family === f.slug)}>{f.label}</Link>)}
      </div>

      {products.length ? (
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">{products.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      ) : <p className="mt-16 text-center text-wine-800/70">No fragrances found. Try another filter.</p>}
    </div>
  );
}
