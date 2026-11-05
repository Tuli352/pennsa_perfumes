"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartLine = { variantId: string; slug: string; name: string; size: string; price: number; qty: number };
type Ctx = {
  lines: CartLine[]; count: number; total: number;
  add: (l: Omit<CartLine, "qty">, qty?: number) => void;
  remove: (variantId: string) => void;
  clear: () => void;
};
const CartCtx = createContext<Ctx | null>(null);
const KEY = "pennsa-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setLines(JSON.parse(raw)); } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {} }, [lines, ready]);

  const value = useMemo<Ctx>(() => ({
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    total: lines.reduce((n, l) => n + l.price * l.qty, 0),
    add: (l, qty = 1) => setLines((cur) => {
      const hit = cur.find((x) => x.variantId === l.variantId);
      return hit ? cur.map((x) => (x.variantId === l.variantId ? { ...x, qty: x.qty + qty } : x)) : [...cur, { ...l, qty }];
    }),
    remove: (id) => setLines((cur) => cur.filter((x) => x.variantId !== id)),
    clear: () => setLines([]),
  }), [lines]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
