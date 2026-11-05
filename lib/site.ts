export const site = {
  name: "Pennsa Perfumes",
  short: "Pennsa",
  descriptor: "Luxury in every spray",
  tagline: "Discover Your Signature Scent",
  sub: "Timeless fragrances. Unforgettable you.",
  address: "Nairobi, Kenya", // TODO: replace with your shop address
  instagram: "https://instagram.com/pennsaperfumes", // TODO: confirm handle
  whatsapp: "254700000000", // TODO: replace with your WhatsApp number (no +)
};

export const infoPages = [
  { slug: "how-to-order", title: "How to order" },
  { slug: "fragrance-guide", title: "Fragrance guide" },
  { slug: "delivery", title: "Delivery & payment" },
  { slug: "our-location", title: "Our location" },
];

// Shop-by strip on the home page (links use the ?collection= or ?family= filters in /shop)
export const categories = [
  { label: "Women's\nFragrances", href: "/shop?collection=women", img: "/products/rose-bloom.jpg", pos: "50% 25%" },
  { label: "Men's\nFragrances", href: "/shop?collection=men", img: "/products/liquid-brun.jpg", pos: "70% 60%" },
  { label: "Unisex\nFragrances", href: "/shop?collection=unisex", img: "/products/leen.jpg", pos: "30% 55%" },
  { label: "Oud\nCollection", href: "/shop?family=oud", img: "/products/liquid-brun.jpg", pos: "95% 90%" },
  { label: "Floral\nScents", href: "/shop?family=floral", img: "/products/habik.jpg", pos: "95% 30%" },
  { label: "Amber &\nWoody", href: "/shop?family=amber", img: "/products/athena.jpg", pos: "70% 60%" },
];
