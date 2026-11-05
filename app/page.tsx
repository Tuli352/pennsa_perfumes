import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { categories } from "@/lib/site";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import { ArrowIcon, GiftIcon, HeadsetIcon, ShieldIcon, TruckIcon } from "@/components/Icons";

export const dynamic = "force-dynamic";

const perks = [
  { Icon: TruckIcon, t: "Free Delivery", d: "Across Kenya" },
  { Icon: ShieldIcon, t: "Secure Payments", d: "M-Pesa & 100% safe" },
  { Icon: HeadsetIcon, t: "Dedicated Support", d: "Always here" },
  { Icon: GiftIcon, t: "Elegant Packaging", d: "Perfect for gifting" },
];

export default async function Home() {
  const featured = await db.product.findMany({ where: { featured: true }, take: 4, orderBy: { createdAt: "desc" }, include: { variants: true } });
  return (
    <>
      <HeroSlider />

      {/* shop-by strip */}
      <section className="border-b border-wine-700/10 bg-blush/60">
        <div className="mx-auto flex max-w-7xl gap-8 overflow-x-auto px-6 py-6 sm:px-8 lg:justify-between [scrollbar-width:none]">
          {categories.map((c) => (
            <Link key={c.label} href={c.href} className="group flex shrink-0 items-center gap-4">
              <span className="relative h-16 w-16 overflow-hidden rounded-full ring-1 ring-wine-700/20">
                <Image src={c.img} alt="" fill sizes="64px" className="object-cover transition group-hover:scale-110" style={{ objectPosition: c.pos }} />
              </span>
              <span className="whitespace-pre-line font-sub text-sm leading-tight text-wine-900">{c.label}</span>
            </Link>
          ))}
          <Link href="/shop" className="chip flex shrink-0 items-center gap-2 self-center">View all <ArrowIcon /></Link>
        </div>
      </section>

      {/* editorial card + featured */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:px-8 lg:grid-cols-[340px_1fr]">
        <div className="relative isolate overflow-hidden rounded-xl bg-wine-950 text-blush lg:min-h-[430px]">
          <Image src="/products/lamsa.jpeg" alt="Lamsa eau de parfum" fill sizes="(min-width:1024px) 340px, 100vw" className="-z-10 object-cover object-center" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-wine-950/80 to-transparent" />
          <div className="flex h-full min-h-[430px] flex-col items-start justify-between p-8">
            <svg viewBox="0 0 24 24" aria-label="Love" className="h-7 w-7 fill-red-600 drop-shadow"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.5c2.1 0 3.9 1.2 5.6 3.2 1.7-2 3.5-3.2 5.6-3.2 3.7 0 5.5 3.900 4 7.300C19.500 16.400 12 21 12 21z" /></svg>
            <Link href="/shop" className="btn-outline w-fit">View more <ArrowIcon /></Link>
          </div>
        </div>

        <div>
          <div className="mb-8 flex items-center gap-6">
            <span className="rule" />
            <h2 className="text-center text-2xl uppercase tracking-[0.22em]">Featured Fragrances</h2>
            <span className="rule" />
            <Link href="/shop" className="hidden shrink-0 items-center gap-2 font-sub text-sm sm:flex">View all products <ArrowIcon /></Link>
          </div>
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            {featured.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* trust bar + newsletter */}
      <section className="bg-wine-950 text-blush">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1fr_auto]">
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {perks.map(({ Icon, t, d }) => (
              <li key={t} className="flex items-center gap-3">
                <span className="text-gold-400"><Icon /></span>
                <span><span className="block font-sub text-sm">{t}</span><span className="block text-xs text-blush/60">{d}</span></span>
              </li>
            ))}
          </ul>
          <Newsletter />
        </div>
      </section>
    </>
  );
}