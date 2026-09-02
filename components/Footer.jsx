import Link from "next/link";
import { contactInfo } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface/50">
      <div className="page-shell py-14">
        <p className="section-label">04 - Our Products</p>
        <h2 className="mt-3 max-w-4xl text-[clamp(2.2rem,5vw,4.6rem)] font-display leading-[1.08] text-text-primary">
          Reviving fibers with precision.
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Revive Fiber Co</h3>
          <p className="mt-2 text-sm text-text-secondary">
            Building circular textile supply chains through reliable recycled fiber processing.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-text-primary">Navigation</h4>
          <div className="mt-2 flex flex-col gap-2 text-sm text-text-secondary">
            <Link href="/about">About</Link>
            <Link href="/work">Work</Link>
            <Link href="/contact">Our Products</Link>
            <Link href="/work-with-us">Contact With Us</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-text-primary">Get In Touch</h4>
          <p className="mt-2 text-sm text-text-secondary">{contactInfo.email}</p>
          <p className="text-sm text-text-secondary">WhatsApp: {contactInfo.whatsapp}</p>
          <p className="mt-2 text-sm text-text-secondary">Corporate Office: {contactInfo.corporateOffice}</p>
          <p className="mt-2 text-sm text-text-secondary">Factory: {contactInfo.factoryAddress}</p>
        </div>
      </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-text-muted">
        © {new Date().getFullYear()} Revive Fiber Co. Crafted for circular value.
      </div>
    </footer>
  );
}
