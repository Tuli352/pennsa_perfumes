import { notFound } from "next/navigation";
import { infoPages, site } from "@/lib/site";

// Placeholder copy: replace with your own policies and details.
const content: Record<string, React.ReactNode> = {
  "how-to-order": (
    <ol className="list-decimal space-y-3 pl-5">
      <li>Browse the shop and pick your fragrance and size.</li>
      <li>Add it to your cart and enter your delivery details.</li>
      <li>We confirm your order and payment (M-Pesa) with you.</li>
      <li>Your perfume is packed in elegant gift packaging and delivered to your door.</li>
    </ol>
  ),
  "fragrance-guide": <p>Add your guide here: how to choose between floral, woody, oud, citrus and amber scents, plus how to make a fragrance last longer.</p>,
  delivery: <p>Add your delivery times, fees and payment options here. Delivery is free across Kenya; payment is by M-Pesa.</p>,
  "our-location": <p>Find us in {site.address}. Add landmarks, opening hours and a Google Maps link.</p>,
};

export function generateStaticParams() { return infoPages.map((p) => ({ slug: p.slug })); }

export default async function Info({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = infoPages.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="eyebrow">Pennsa Perfumes</p>
      <h1 className="mt-2 text-5xl">{page.title}</h1>
      <div className="mt-8 leading-relaxed text-wine-900/85">{content[slug]}</div>
    </div>
  );
}
