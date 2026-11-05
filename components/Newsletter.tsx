"use client";
import { useState } from "react";
import { ArrowIcon, MailIcon } from "./Icons";

export default function Newsletter() {
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    const res = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    if (res.ok) { form.reset(); setMsg("Thank you, you're on the list."); } else setMsg("Please enter a valid email.");
  }
  return (
    <form onSubmit={submit} className="w-full max-w-md">
      <div className="flex overflow-hidden rounded-full border border-gold-500/50 bg-wine-900/70">
        <span className="grid place-items-center pl-5 text-gold-400"><MailIcon /></span>
        <input name="email" type="email" required placeholder="Subscribe for exclusive offers…" className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-xs text-blush placeholder:text-blush/60 focus:outline-none" />
        <button aria-label="Subscribe" className="px-6 text-wine-950" style={{ background: "linear-gradient(135deg,#f6d9b4,#e6b17c)" }}><ArrowIcon /></button>
      </div>
      {msg && <p className="mt-2 pl-5 text-xs text-gold-300">{msg}</p>}
    </form>
  );
}
