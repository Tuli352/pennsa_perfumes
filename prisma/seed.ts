import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// Names, brands, prices and notes are PLACEHOLDERS built from your product photos.
// Prices are in cents: 850000 = KSh 8,500. Replace with real data (or edit in your DB).
const collections = [
  { slug: "women", name: "Women's Fragrances", description: "Floral, fruity and softly sensual.", image: "/products/rose-bloom.jpg" },
  { slug: "men", name: "Men's Fragrances", description: "Woody, spicy and bold.", image: "/products/liquid-brun.jpg" },
  { slug: "unisex", name: "Unisex Fragrances", description: "Worn by everyone.", image: "/products/leen.jpg" },
];

const products = [
  {
    slug: "habik", name: "Habik", brand: "Lattafa", img: "habik", collection: "women", family: "floral", badge: "NEW",
    tagline: "Floral • Romantic • Captivating", price: 950000, notes: ["Rose", "Raspberry", "Amber", "Musk"],
    description: "An ode to love's deepest hue. Habik arrives in a rose-gold filigree bottle with a rich, romantic heart. 100ml Eau de Parfum. Placeholder copy: replace with your own.",
  },
  {
    slug: "rose-bloom", name: "Rose Bloom", brand: "Lattafa", img: "rose-bloom", collection: "women", family: "floral", badge: "BEST SELLER",
    tagline: "Floral • Fresh • Feminine", price: 850000, notes: ["Green Pear", "Mandarin", "Gardenia", "Jasmine", "Muguet", "Cedarwood", "Musk"],
    description: "A garden in a bottle: juicy green pear and mandarin open to a white-floral heart of gardenia, jasmine and lily of the valley, settling on soft cedarwood and musk. Placeholder name and copy: confirm the exact product name.",
  },
  {
    slug: "liquid-brun", name: "Liquid Brun", brand: "French Avenue", img: "liquid-brun", collection: "unisex", family: "oud", badge: "TRENDING",
    tagline: "Woody • Warm • Gourmand", price: 1050000, notes: ["Agarwood", "Vanilla", "Amber Resin", "Pine"],
    description: "Smoky woods, glowing amber resin and creamy vanilla in a sculpted copper-and-gold bottle. Placeholder copy: replace with your own.",
  },
  {
    slug: "leen", name: "Leen", brand: "Lattafa Pride", img: "leen", collection: "unisex", family: "citrus", badge: "NEW",
    tagline: "Citrus • Spicy • Luminous", price: 800000, notes: ["Bergamot", "Pink Pepper", "Ginger", "Turmeric"],
    description: "Bright citrus and pink pepper over warm ginger and turmeric, in a golden column bottle. Placeholder copy: replace with your own.",
  },
  {
    slug: "athena", name: "Athena", brand: "Maison Alhambra", img: "athena", collection: "women", family: "amber", badge: null as string | null,
    tagline: "Amber • Warm • Luxurious", price: 900000, notes: ["Amber", "Vanilla", "Musk"],
    description: "A glowing golden Eau de Parfum crowned with a marble-effect cap. Placeholder copy: replace with your own.",
  },
];

async function main() {
  const cols: Record<string, string> = {};
  for (const c of collections) {
    const col = await db.collection.upsert({ where: { slug: c.slug }, update: {}, create: c });
    cols[c.slug] = col.id;
  }
  for (const p of products) {
    await db.product.upsert({
      where: { slug: p.slug }, update: {},
      create: {
        slug: p.slug, name: p.name, brand: p.brand, tagline: p.tagline, description: p.description,
        family: p.family, notes: p.notes, badge: p.badge, price: p.price,
        images: [`/products/${p.img}.jpg`], featured: true, collectionId: cols[p.collection],
        variants: { create: [{ size: "100ml", color: "Default", stock: 10 }] },
      },
    });
  }
}
main().finally(() => db.$disconnect());
