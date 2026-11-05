"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import Logo from "./Logo";
import { BagIcon, ChevronIcon, CloseIcon, MenuIcon, SearchIcon } from "./Icons";

const shop = [
  { label: "All fragrances", href: "/shop" },
  { label: "Floral scents", href: "/shop?family=floral" },
  { label: "Oud & woody", href: "/shop?family=oud" },
  { label: "Citrus & spicy", href: "/shop?family=citrus" },
  { label: "Amber & vanilla", href: "/shop?family=amber" },
];
const collections = [
  { label: "Women's fragrances", href: "/shop?collection=women" },
  { label: "Men's fragrances", href: "/shop?collection=men" },
  { label: "Unisex fragrances", href: "/shop?collection=unisex" },
];

function Menu({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  return (
    <div className="group relative">
      <button className="nav-link flex items-center gap-1.5 py-6">{label} <ChevronIcon /></button>
      <div className="invisible absolute left-0 top-full z-50 min-w-56 border border-gold-500/30 bg-[#6a0b1c] py-3 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100">
        {items.map((i) => <Link key={i.href} href={i.href} className="block px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] text-blush hover:bg-[#8a1426] hover:text-gold-300">{i.label}</Link>)}
      </div>
    </div>
  );
}

export default function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-gold-500/20 bg-[#6a0b1c]/95 text-blush backdrop-blur">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
        <nav className="hidden items-center gap-8 md:flex">
          <Menu label="Shop" items={shop} />
          <Menu label="Collections" items={collections} />
          <Link href="/info/how-to-order" className="nav-link">About</Link>
        </nav>
        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <CloseIcon /> : <MenuIcon />}</button>
        <Logo />
        <div className="flex items-center justify-end gap-5">
          <Link href="/shop" aria-label="Search" className="hover:text-gold-300"><SearchIcon /></Link>
          <Link href="/cart" aria-label="Cart" className="relative hover:text-gold-300">
            <BagIcon />
            <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold-400 px-1 text-[9px] font-semibold text-wine-950">{count}</span>
          </Link>
        </div>
      </div>
      {open && (
        <nav className="border-t border-gold-500/20 bg-[#6a0b1c] px-6 pb-6 pt-2 md:hidden">
          {[...shop, ...collections, { label: "About / How to order", href: "/info/how-to-order" }].map((i) => (
            <Link key={i.href + i.label} href={i.href} onClick={() => setOpen(false)} className="block border-b border-blush/10 py-3 text-[11px] uppercase tracking-[0.2em]">{i.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
