import AnimatedSection from "@/components/AnimatedSection";
import { team, timeline } from "@/lib/content";

export const metadata = {
  title: "About | Revive Fiber Co",
  description: "Learn about Revive Fiber Co's mission, values, and sustainability milestones."
};

export default function AboutPage() {
  return (
    <div className="page-shell py-16">
      <AnimatedSection className="panel p-8 md:p-12">
        <p className="section-label">01 - About</p>
        <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.08] text-text-primary">Built to advance circular textile manufacturing.</h1>
        <p className="mt-5 max-w-3xl text-text-secondary">
          Revive Fiber Co was founded to transform textile waste into reliable, high-performance fiber inputs for modern manufacturers.
          We combine operational precision with environmental responsibility to help partners scale sustainably.
        </p>
      </AnimatedSection>

      <AnimatedSection className="mt-6">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-text-primary">Core Values</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            ["Sustainability", "We reduce landfill dependency by designing processes around reuse and circularity."],
            ["Quality", "Every batch is monitored for consistency, performance, and reliable production outcomes."],
            ["Community", "We collaborate with local suppliers and partners to create long-term shared impact."]
          ].map(([title, text]) => (
            <article key={title} className="panel-muted p-5">
              <h3 className="font-semibold text-text-primary">{title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{text}</p>
            </article>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-6">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-text-primary">Milestones</h2>
        <div className="mt-6 space-y-4 border-l-2 border-accent/35 pl-6">
          {timeline.map((item) => (
            <article key={item.year} className="panel relative p-5">
              <span className="absolute -left-10 top-6 h-3 w-3 rounded-full bg-accent" />
              <p className="text-xs uppercase tracking-wide text-text-muted">{item.year}</p>
              <h3 className="mt-1 font-semibold text-text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{item.text}</p>
            </article>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-6">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-text-primary">Team</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {team.map((member) => (
            <article key={member.name} className="panel-muted p-5">
              <div className="h-24 rounded-xl bg-gradient-to-br from-[#d8ebd8] to-[#c8e2cb]" />
              <h3 className="mt-4 font-semibold text-text-primary">{member.name}</h3>
              <p className="text-sm text-text-secondary">{member.role}</p>
            </article>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
