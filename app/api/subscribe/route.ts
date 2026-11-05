import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({ email: "" }));
  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email))
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  await db.subscriber.upsert({ where: { email }, update: {}, create: { email } });
  return NextResponse.json({ ok: true });
}
