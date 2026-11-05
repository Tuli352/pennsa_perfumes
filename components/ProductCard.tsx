"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";
import { BagIcon, HeartIcon } from "./Icons";

export type CardProduct = {
  slug: string; name: string; brand: string; tagline: string | null; badge: string | null; price: number; images: string[];
  variants: { id: string; size: string; stock: number }[];
};

export default function ProductCard({ p }: { p: CardProduct }) {
  const { add } = useCart();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [idx, setIdx] = useState(0);
  const v = p.variants.find((x) => x.stock > 0);

  function addToCart() {
    if (!v) return;
    add({ variantId: v.id, slug: p.slug, name: p.name, size: v.size, price: p.price });
    setAdded(true); setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="group relative rounded-2xl bg-[#f7ded7] p-3 shadow-[0_8px_30px_-18px_rgba(46,7,18,0.5)] ring-1 ring-wine-700/10 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(46,7,18,0.55)]">
      {p.badge && <span className="absolute left-5 top-5 z-10 rounded-full bg-wine-800 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-blush">{p.badge}</span>}
      <button onClick={() => setLiked(!liked)} aria-label="Save to wishlist" className={`absolute right-5 top-5 z-10 ${liked ? "text-wine-600" : "text-wine-800/70"} transition hover:text-wine-600`}><HeartIcon filled={liked} /></button>
      <div className="relative">
        <Link href={`/product/${p.slug}`} className="block">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-blush">
            {p.images[idx] && <Image src={p.images[idx]} alt={`${p.brand} ${p.name}`} fill sizes="(min-width:1024px) 22vw, 50vw" className="object-contain" />}
          </div>
        </Link>
        {p.images.length > 1 && (
          <div className="absolute inset-x-0 bottom-2 z-10 flex justify-center gap-1.5">
            {p.images.map((_, n) => (
              <button key={n} aria-label={`Image ${n + 1}`} onClick={() => setIdx(n)} className={`h-2 w-2 rounded-full ${n === idx ? "bg-wine-700" : "bg-wine-700/30"}`} />
            ))}
          </div>
        )}
      </div>
      <Link href={`/product/${p.slug}`} className="block">
        <div className="px-1 pt-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.24em] text-gold-600">{p.brand}</p>
          <h3 className="mt-1 text-2xl text-wine-900">{p.name}</h3>
          {p.tagline && <p className="mt-0.5 text-[11px] text-wine-800/60">{p.tagline}</p>}
          <p className="mt-2 font-sub text-base text-wine-800">{money(p.price)}</p>
        </div>
      </Link>
      <button onClick={addToCart} disabled={!v} className="btn-wine mt-3 w-full"><BagIcon />{!v ? "Sold out" : added ? "Added ✓" : "Add to cart"}</button>
    </article>
  );
}
