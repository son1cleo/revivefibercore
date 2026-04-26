import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function WorkPreview({ items }) {
  return (
    <AnimatedSection className="page-shell py-14" delay={0.05}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="section-label">03 - Work</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.12] text-text-primary">Featured Projects</h2>
        </div>
        <Link href="/work" className="text-sm font-medium text-text-secondary hover:text-accent">
          View Full Showcase
        </Link>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="panel group overflow-hidden">
            <div className="relative h-56 overflow-hidden">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-text-primary">{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
