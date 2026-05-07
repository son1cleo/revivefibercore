import { MessageCircleMore } from "lucide-react";

export default function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801988831521";
  const href = `https://wa.me/${phone}`;

  return (
    <a
      href={href}
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-accent text-white shadow-soft transition hover:bg-accent-h"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircleMore className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}
