export default function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801988831521";
  const href = `https://wa.me/${phone}`;

  return (
    <a
      href={href}
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 rounded-full border border-border bg-accent px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-accent-h"
      aria-label="Chat on WhatsApp"
    >
      WhatsApp
    </a>
  );
}
