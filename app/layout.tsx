import type { Metadata } from "next";
import { Cormorant_Garamond, Cardo, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-cormorant" });
const cardo = Cardo({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-cardo" });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-jost" });

export const metadata: Metadata = {
  title: { default: "Pennsa Perfumes · Luxury in every spray", template: "%s · Pennsa Perfumes" },
  description: "Pennsa Perfumes: authentic designer and Arabian fragrances, delivered across Kenya.",
  icons: { icon: "/brand/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${cardo.variable} ${jost.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
