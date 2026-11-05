"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowIcon } from "./Icons";

const slides = [
  { img: "/products/habik.jpg", alt: "Lattafa Habik eau de parfum", href: "/product/habik" },
  { img: "/products/liquid-brun.jpg", alt: "French Avenue Liquid Brun", href: "/product/liquid-brun" },
  { img: "/products/leen.jpg", alt: "Lattafa Leen", href: "/product/leen" },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);
  const s = slides[i];
  return (
    <section className="relative isolate overflow-hidden bg-wine-950 text-blush">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_30%,#8a1426_0%,#35040d_72%)]" />
      {/* photo: full-bleed on mobile (dimmed), right-hand side on desktop */}
      <div key={i} className="absolute inset-y-0 right-0 -z-10 w-full opacity-45 md:w-[62%] md:opacity-100 md:fade-left">
        <Image src={s.img} alt={s.alt} fill priority sizes="(min-width:768px) 62vw, 100vw" className="anim-zoom object-cover object-center" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-wine-950/70 via-transparent to-wine-950/20 md:hidden" />

      <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-6 py-16 sm:px-8 md:min-h-[640px]">
        <div key={i} className="anim-in max-w-xl">
          <p className="flex items-center gap-4 text-[11px] uppercase tracking-[0.34em] text-gold-400"><span className="h-px w-10 bg-gold-500/70" />Nationwide delivery 🚚<span className="hidden h-px w-24 bg-gold-500/70 sm:block" /></p>
          <h1 className="mt-6 text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
            Affordable<br /><em className="text-gold-300">Arabic Perfumes</em>
          </h1>
          <p className="mt-5 font-sub text-lg text-blush/90">Order Online - Next day delivery</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/shop" className="btn-gold">Shop the collection <ArrowIcon /></Link>
            <Link href={s.href} className="btn-outline">View fragrance</Link>
          </div>
        </div>
        <div className="mt-12 flex gap-6 text-[11px] tracking-[0.2em]">
          {slides.map((_, n) => (
            <button key={n} onClick={() => setI(n)} aria-label={`Slide ${n + 1}`} className={n === i ? "text-blush" : "text-blush/45 hover:text-blush"}>
              {String(n + 1).padStart(2, "0")}
              <span className={`mt-2 block h-px ${n === i ? "w-9 bg-gold-400" : "w-5 bg-blush/30"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}