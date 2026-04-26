import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function WorkPreview({ items }) {
  return (
    <AnimatedSection className="mx-auto w-full max-w-6xl px-5 py-14" delay={0.05}>
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-3xl font-bold text-charcoal">Featured Work</h2>
        <Link href="/work" className="text-sm font-medium text-forest hover:underline">
          View Full Showcase
        </Link>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="group overflow-hidden rounded-2xl border border-forest/10 bg-white">
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
              <h3 className="font-semibold text-charcoal">{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
