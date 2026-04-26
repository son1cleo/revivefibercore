export default function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801000000000";
  const href = `https://wa.me/${phone}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 rounded-full bg-forest px-4 py-3 text-sm font-semibold text-cream shadow-soft transition hover:bg-olive"
      aria-label="Chat on WhatsApp"
    >
      WhatsApp
    </a>
  );
}
