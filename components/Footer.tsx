import Link from "next/link";
import Logo from "./Logo";
import { infoPages, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-[#6a0b1c] text-blush">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo className="!justify-start" size={52} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-blush/70">Authentic designer and Arabian fragrances, beautifully packaged and delivered across Kenya.</p>
        </div>
        <div>
          <h4 className="eyebrow mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-blush/80">
            <li><Link href="/shop" className="hover:text-gold-300">All fragrances</Link></li>
            <li><Link href="/shop?collection=women" className="hover:text-gold-300">Women's</Link></li>
            <li><Link href="/shop?collection=men" className="hover:text-gold-300">Men's</Link></li>
            <li><Link href="/shop?collection=unisex" className="hover:text-gold-300">Unisex</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-4">Help</h4>
          <ul className="space-y-2 text-sm text-blush/80">
            {infoPages.map((p) => <li key={p.slug}><Link href={`/info/${p.slug}`} className="hover:text-gold-300">{p.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-blush/80">
            <li>{site.address}</li>
            <li><a href={`https://wa.me/${site.whatsapp}`} className="hover:text-gold-300">WhatsApp</a></li>
            <li><a href={site.instagram} className="hover:text-gold-300">Instagram</a></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-gold-500/20 py-5 text-center text-[11px] uppercase tracking-[0.2em] text-blush/50">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
    </footer>
  );
}
