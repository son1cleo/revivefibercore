import AnimatedSection from "./AnimatedSection";

export default function Testimonials({ items }) {
  return (
    <AnimatedSection className="mx-auto w-full max-w-6xl px-5 py-16">
      <h2 className="text-3xl font-bold text-charcoal">What Partners Say</h2>
      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.author + item.company} className="rounded-2xl border border-forest/10 bg-white p-6 shadow-soft">
            <p className="text-sm leading-relaxed text-charcoal/80">"{item.quote}"</p>
            <p className="mt-5 text-sm font-semibold text-charcoal">{item.author}</p>
            <p className="text-xs text-charcoal/70">{item.company}</p>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
