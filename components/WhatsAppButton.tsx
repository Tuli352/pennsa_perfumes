import { site } from "@/lib/site";

export default function WhatsAppButton() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Pennsa Perfumes, I'd like to order a fragrance.")}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition hover:scale-110 sm:bottom-6 sm:right-6">
      <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
        <path d="M16.04 3C8.84 3 3 8.83 3 16.02c0 2.3.6 4.54 1.74 6.52L3 29l6.64-1.7a13 13 0 0 0 6.4 1.64h.01C23.23 28.94 29 23.2 29 16.02 29 8.83 23.24 3 16.04 3Zm0 23.7h-.01a10.7 10.7 0 0 1-5.45-1.5l-.39-.23-3.94 1.01 1.05-3.84-.25-.4a10.65 10.65 0 0 1-1.63-5.72c0-5.9 4.8-10.7 10.72-10.7 2.86 0 5.55 1.12 7.57 3.14a10.6 10.6 0 0 1 3.13 7.57c0 5.9-4.81 10.67-10.8 10.67Zm5.87-8c-.32-.16-1.9-.94-2.2-1.05-.29-.1-.5-.16-.72.16-.21.32-.83 1.05-1.02 1.26-.19.21-.37.24-.7.08a8.7 8.7 0 0 1-2.58-1.6 9.7 9.7 0 0 1-1.78-2.22c-.19-.32 0-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.68 0 1.58 1.15 3.1 1.31 3.32.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.77.24 1.46.21 2.01.13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}
