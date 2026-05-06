import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function AboutSnippet() {
  return (
    <AnimatedSection className="page-shell py-20">
      <div className="panel grid gap-8 p-8 md:grid-cols-2 md:items-center md:p-10">
        <div>
          <p className="section-label">01 - About</p>
          <h2 className="mt-3 max-w-xl font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.12] text-text-primary">Turning textile byproducts into future-ready raw material.</h2>
        </div>
        <div>
          <p className="text-text-secondary">
            Revive Fiber Co partners with manufacturers to recover value from textile waste through modern fiber recycling and transparent sustainability practices.
          </p>
          <Link href="/about" className="btn-ghost mt-6 inline-block">
            Learn More
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
