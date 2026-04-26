import AnimatedSection from "@/components/AnimatedSection";
import { team, timeline } from "@/lib/content";

export const metadata = {
  title: "About | Revive Fiber Core",
  description: "Learn about Revive Fiber Core's mission, values, and sustainability milestones."
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-16">
      <AnimatedSection>
        <p className="text-xs uppercase tracking-[0.2em] text-olive">Our Story</p>
        <h1 className="mt-3 text-4xl font-bold text-charcoal">Built to advance circular textile manufacturing.</h1>
        <p className="mt-5 max-w-3xl text-charcoal/80">
          Revive Fiber Core was founded to transform textile waste into reliable, high-performance fiber inputs for modern manufacturers.
          We combine operational precision with environmental responsibility to help partners scale sustainably.
        </p>
      </AnimatedSection>

      <AnimatedSection className="mt-14">
        <h2 className="text-2xl font-bold text-charcoal">Core Values</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            ["Sustainability", "We reduce landfill dependency by designing processes around reuse and circularity."],
            ["Quality", "Every batch is monitored for consistency, performance, and reliable production outcomes."],
            ["Community", "We collaborate with local suppliers and partners to create long-term shared impact."]
          ].map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-forest/10 bg-white p-5 shadow-soft">
              <h3 className="font-semibold text-charcoal">{title}</h3>
              <p className="mt-2 text-sm text-charcoal/80">{text}</p>
            </article>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-14">
        <h2 className="text-2xl font-bold text-charcoal">Milestones</h2>
        <div className="mt-6 space-y-4 border-l-2 border-sage pl-6">
          {timeline.map((item) => (
            <article key={item.year} className="relative rounded-2xl border border-forest/10 bg-white p-5 shadow-soft">
              <span className="absolute -left-10 top-6 h-3 w-3 rounded-full bg-forest" />
              <p className="text-xs uppercase tracking-wide text-olive">{item.year}</p>
              <h3 className="mt-1 font-semibold text-charcoal">{item.title}</h3>
              <p className="mt-2 text-sm text-charcoal/80">{item.text}</p>
            </article>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-14">
        <h2 className="text-2xl font-bold text-charcoal">Team</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {team.map((member) => (
            <article key={member.name} className="rounded-2xl border border-forest/10 bg-white p-5 shadow-soft">
              <div className="h-24 rounded-xl bg-gradient-to-br from-sage/40 to-mint/40" />
              <h3 className="mt-4 font-semibold text-charcoal">{member.name}</h3>
              <p className="text-sm text-charcoal/70">{member.role}</p>
            </article>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
