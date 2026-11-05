"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";

export default function CartPage() {
  const { lines, remove, total, clear } = useCart();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);

  async function checkout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMsg("");
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...f, items: lines.map((l) => ({ variantId: l.variantId, quantity: l.qty })) }) });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) return setMsg(data.error ?? "Something went wrong");
    clear(); setDone(true); setMsg(`Order ${data.orderId} received. We'll be in touch to confirm payment via M-Pesa.`);
  }

  if (!lines.length) return (
    <div className="px-6 py-28 text-center">
      <h1 className="text-5xl">{done ? "Thank you" : "Your cart is empty"}</h1>
      <p className="mt-4 text-wine-800/80">{msg || "Discover your signature scent."}</p>
      <Link href="/shop" className="btn-wine mt-8">Continue shopping</Link>
    </div>
  );

  return (
    <div className="mx-auto grid max-w-5xl gap-12 px-6 py-14 sm:px-8 md:grid-cols-2">
      <div>
        <h1 className="text-5xl">Your <em>cart</em></h1>
        <ul className="mt-6 divide-y divide-wine-700/15">
          {lines.map((l) => (
            <li key={l.variantId} className="flex items-start justify-between gap-4 py-4 text-sm">
              <span><Link href={`/product/${l.slug}`} className="font-sub text-base">{l.name}</Link><br /><span className="text-wine-800/60">{l.size} × {l.qty}</span></span>
              <span className="text-right">{money(l.price * l.qty)}<br /><button onClick={() => remove(l.variantId)} className="text-xs underline opacity-60">remove</button></span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-right font-sub text-xl">Total {money(total)}</p>
        <p className="mt-1 text-right text-xs text-wine-800/60">Free delivery across Kenya</p>
      </div>
      <form onSubmit={checkout} className="space-y-3 rounded-2xl bg-[#f7ded7] p-6 ring-1 ring-wine-700/10">
        <h2 className="mb-4 text-3xl">Checkout</h2>
        <input name="name" required placeholder="Full name" className="field" />
        <input name="email" type="email" required placeholder="Email" className="field" />
        <input name="phone" placeholder="Phone (M-Pesa)" className="field" />
        <input name="country" required placeholder="Country" defaultValue="Kenya" className="field" />
        <textarea name="address" required placeholder="Delivery address" rows={3} className="field" />
        <button disabled={busy} className="btn-wine w-full py-4">{busy ? "Placing order…" : "Place order"}</button>
        {msg && <p className="text-sm text-wine-600">{msg}</p>}
      </form>
    </div>
  );
}
