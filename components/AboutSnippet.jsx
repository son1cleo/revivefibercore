import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function AboutSnippet() {
  return (
    <AnimatedSection className="mx-auto w-full max-w-6xl px-5 py-16">
      <div className="grid gap-8 rounded-3xl bg-white/80 p-8 shadow-soft md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-olive">About Revive Fiber Core</p>
          <h2 className="mt-3 text-3xl font-bold text-charcoal">Turning textile byproducts into future-ready raw material.</h2>
        </div>
        <div>
          <p className="text-charcoal/80">
            Revive Fiber Core partners with manufacturers to recover value from textile waste through modern fiber recycling and transparent sustainability practices.
          </p>
          <Link href="/about" className="mt-5 inline-block rounded-full border border-forest/30 px-5 py-2 text-sm font-medium text-forest hover:bg-forest/5">
            Learn More
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
