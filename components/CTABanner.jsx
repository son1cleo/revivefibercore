import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="page-shell py-14">
      <div className="panel flex w-full flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10">
        <div>
          <p className="section-label">Let&apos;s Collaborate</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.3rem)] text-text-primary">Ready to work with us? Get in touch.</h2>
        </div>
        <Link href="/contact" className="btn-primary">
          Contact Revive Fiber Core
        </Link>
      </div>
    </section>
  );
}
