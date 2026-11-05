"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { BagIcon } from "./Icons";

type V = { id: string; size: string; stock: number };

export default function AddToCart({ product, variants }: { product: { slug: string; name: string; price: number }; variants: V[] }) {
  const { add } = useCart();
  const firstInStock = variants.find((v) => v.stock > 0);
  const [sel, setSel] = useState<string | undefined>(firstInStock?.id);
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);
  const v = variants.find((x) => x.id === sel);

  function onAdd() {
    if (!v) return;
    add({ variantId: v.id, slug: product.slug, name: product.name, size: v.size, price: product.price }, qty);
    setDone(true); setTimeout(() => setDone(false), 2500);
  }

  return (
    <div className="mt-8 space-y-6">
      <div>
        <p className="eyebrow mb-3">Size</p>
        <div className="flex flex-wrap gap-3">
          {variants.map((x) => (
            <button key={x.id} disabled={x.stock < 1} onClick={() => { setSel(x.id); setQty(1); }} className={`chip disabled:line-through disabled:opacity-40 ${sel === x.id ? "chip-active" : ""}`}>{x.size}</button>
          ))}
        </div>
        {v && v.stock <= 3 && <p className="mt-3 text-xs text-wine-600">Only {v.stock} left</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-wine-700/30">
          <button aria-label="Less" className="h-11 w-11 text-lg" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <span className="w-8 text-center text-sm">{qty}</span>
          <button aria-label="More" className="h-11 w-11 text-lg" onClick={() => setQty(Math.min(v?.stock ?? 1, qty + 1))}>+</button>
        </div>
        <button onClick={onAdd} disabled={!v} className="btn-wine flex-1 py-4"><BagIcon />{!firstInStock ? "Sold out" : done ? "Added to cart ✓" : "Add to cart"}</button>
      </div>
      {done && <Link href="/cart" className="inline-block text-sm underline">View cart &amp; checkout →</Link>}
    </div>
  );
}
