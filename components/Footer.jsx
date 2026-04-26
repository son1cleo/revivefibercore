import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-forest/10 bg-white/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-3">
        <div>
          <h3 className="font-semibold text-forest">Revive Fiber Core</h3>
          <p className="mt-2 text-sm text-charcoal/80">
            Building circular textile supply chains through reliable recycled fiber processing.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-forest">Navigation</h4>
          <div className="mt-2 flex flex-col gap-2 text-sm text-charcoal/80">
            <Link href="/about">About</Link>
            <Link href="/work">Work</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-forest">Get In Touch</h4>
          <p className="mt-2 text-sm text-charcoal/80">hello@revivefibercore.com</p>
          <p className="text-sm text-charcoal/80">+880 1700 000000</p>
          <p className="text-sm text-charcoal/80">Dhaka, Bangladesh</p>
        </div>
      </div>
      <div className="border-t border-forest/10 px-5 py-4 text-center text-xs text-charcoal/70">
        © {new Date().getFullYear()} Revive Fiber Core. All rights reserved.
      </div>
    </footer>
  );
}
