import { notFound } from "next/navigation";
import Image from "next/image";
import { db } from "@/lib/db";
import { money } from "@/lib/format";
import AddToCart from "@/components/AddToCart";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await db.product.findUnique({ where: { slug } });
  return { title: p ? `${p.name} · ${p.brand}` : "Fragrance" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await db.product.findUnique({ where: { slug }, include: { variants: true } });
  if (!p) notFound();
  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 sm:px-8 md:grid-cols-2">
      <div className="space-y-4">
        {p.images.length ? p.images.map((src) => (
          <div key={src} className="relative aspect-square overflow-hidden rounded-2xl bg-blush"><Image src={src} alt={`${p.brand} ${p.name}`} fill priority sizes="(min-width:768px) 50vw, 100vw" className="object-contain" /></div>
        )) : <div className="aspect-square rounded-2xl bg-blush" />}
      </div>
      <div className="md:sticky md:top-28 md:self-start">
        {p.badge && <span className="rounded-full bg-wine-800 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-blush">{p.badge}</span>}
        <p className="eyebrow mt-4">{p.brand}</p>
        <h1 className="mt-2 text-6xl">{p.name}</h1>
        {p.tagline && <p className="mt-2 font-sub text-wine-800/70">{p.tagline}</p>}
        <p className="mt-5 font-sub text-2xl">{money(p.price)}</p>
        <p className="mt-6 leading-relaxed text-wine-900/80">{p.description}</p>
        {p.notes.length > 0 && (
          <div className="mt-6">
            <p className="eyebrow mb-3">Key notes</p>
            <div className="flex flex-wrap gap-2">{p.notes.map((n) => <span key={n} className="rounded-full border border-gold-500/50 bg-white/50 px-3 py-1 text-xs">{n}</span>)}</div>
          </div>
        )}
        <AddToCart product={{ slug: p.slug, name: p.name, price: p.price }} variants={p.variants.map((v) => ({ id: v.id, size: v.size, stock: v.stock }))} />
        <ul className="mt-10 space-y-2 border-t border-wine-700/15 pt-6 text-sm text-wine-800/80">
          <li>✦ Free delivery across Kenya</li><li>✦ Pay securely with M-Pesa</li><li>✦ Presented in elegant gift packaging</li>
        </ul>
      </div>
    </div>
  );
}
