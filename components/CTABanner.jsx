import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="px-5 py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-forest to-olive p-8 md:flex-row md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cream/80">Start a Partnership</p>
          <h2 className="mt-2 text-3xl font-bold text-cream">Ready to work with us? Get in touch.</h2>
        </div>
        <Link href="/contact" className="rounded-full bg-cream px-6 py-3 text-sm font-semibold text-forest transition hover:bg-mint">
          Contact Revive Fiber Core
        </Link>
      </div>
    </section>
  );
}
