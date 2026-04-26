import AnimatedSection from "./AnimatedSection";

export default function Testimonials({ items }) {
  return (
    <AnimatedSection className="page-shell py-14">
      <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] text-text-primary">What Partners Say</h2>
      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.author + item.company} className="panel-muted p-6">
            <p className="text-sm leading-relaxed text-text-secondary">"{item.quote}"</p>
            <p className="mt-5 text-sm font-semibold text-text-primary">{item.author}</p>
            <p className="text-xs text-text-muted">{item.company}</p>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
