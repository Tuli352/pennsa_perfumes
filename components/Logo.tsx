import Link from "next/link";
import Image from "next/image";

export default function Logo({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <Link href="/" aria-label="Pennsa Perfumes home" className={`flex items-center justify-center gap-3 ${className}`}>
      <Image src="/brand/logo.png" alt="" width={size} height={size} className="rounded-full object-cover" style={{ width: size, height: size }} priority />
      <span className="text-left leading-none">
        <span className="block font-heading text-2xl font-medium uppercase tracking-[0.14em] text-blush sm:text-[1.7rem]">Pennsa</span>
        <span className="mt-1 block text-[8px] uppercase tracking-[0.62em] text-gold-400">Perfumes</span>
      </span>
    </Link>
  );
}