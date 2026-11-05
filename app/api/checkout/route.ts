import { NextResponse } from "next/server";
import { db } from "@/lib/db";

type Item = { variantId: string; quantity: number };

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b || !b.name || !b.email || !b.address || !Array.isArray(b.items) || !b.items.length)
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });

  const items: Item[] = b.items.map((i: Item) => ({ variantId: String(i.variantId), quantity: Math.max(1, Math.floor(Number(i.quantity) || 1)) }));
  try {
    const order = await db.$transaction(async (tx) => {
      const variants = await tx.variant.findMany({ where: { id: { in: items.map((i) => i.variantId) } }, include: { product: true } });
      let total = 0;
      const rows = items.map((i) => {
        const v = variants.find((x) => x.id === i.variantId);
        if (!v) throw new Error("An item in your cart is no longer available.");
        if (v.stock < i.quantity) throw new Error(`Sorry, only ${v.stock} left of ${v.product.name}.`);
        total += v.product.price * i.quantity;
        return { variantId: v.id, quantity: i.quantity, unitPrice: v.product.price };
      });
      for (const r of rows) await tx.variant.update({ where: { id: r.variantId }, data: { stock: { decrement: r.quantity } } });
      return tx.order.create({
        data: { email: b.email, name: b.name, phone: b.phone || null, address: b.address, country: b.country || "Kenya", total, items: { create: rows } },
      });
    });
    return NextResponse.json({ orderId: order.id });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Could not place order." }, { status: 400 });
  }
}
