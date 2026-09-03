import { Factory, Globe2, MapPin, Package, Users, Warehouse } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import IconCardGrid from "@/components/IconCardGrid";
import TeamGrid from "@/components/TeamGrid";
import { facilities, globalMarkets, rawMaterials, recyclingProcess, team } from "@/lib/content";

export const metadata = {
  title: "About | Revive Fiber Co",
  description: "Learn about Revive Fiber Co's mission, values, recycling process, and global reach."
};

const facilityIcons = [MapPin, Factory, Warehouse, Users, Package];

const coreValues = [
  { title: "Sustainability", text: "We reduce landfill dependency by designing processes around reuse and circularity.", icon: "Leaf" },
  { title: "Quality", text: "Every batch is monitored for consistency, performance, and reliable production outcomes.", icon: "ShieldCheck" },
  { title: "Community", text: "We collaborate with local suppliers and partners to create long-term shared impact.", icon: "HeartHandshake" }
];

const processIcons = ["Package", "Palette", "Scissors", "Cog", "Wind", "ClipboardCheck", "Box", "Truck"];
const processItems = recyclingProcess.map((item, index) => ({ ...item, icon: processIcons[index] || "Cog" }));

const materialIcons = ["Shirt", "Layers", "Scissors", "Recycle", "Package", "Box"];
const materialItems = rawMaterials.map((item, index) => ({ ...item, icon: materialIcons[index] || "Recycle" }));

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

      <AnimatedSection className="mt-12">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-text-primary">Core Values</h2>
        <IconCardGrid items={coreValues} columns="md:grid-cols-3" />
      </AnimatedSection>

      <AnimatedSection className="mt-14">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-text-primary">Our Recycling Process</h2>
        <p className="mt-2 text-sm text-text-secondary">Eight controlled stages turn textile waste into export-ready fiber.</p>
        <IconCardGrid items={processItems} columns="sm:grid-cols-2 lg:grid-cols-4" />
      </AnimatedSection>

      <AnimatedSection className="mt-14">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-text-primary">What We Recycle</h2>
        <p className="mt-2 text-sm italic text-accent">Turning waste into value, for a greener future.</p>
        <IconCardGrid items={materialItems} columns="sm:grid-cols-2 md:grid-cols-3" />
      </AnimatedSection>

      <AnimatedSection className="mt-14">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-text-primary">Our Facilities</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {facilities.map((item, index) => {
            const Icon = facilityIcons[index] || MapPin;

            return (
              <article
                key={item.label}
                className="panel-muted flex items-start gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-soft"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-bg text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-text-primary">{item.label}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{item.value}</p>
                </div>
              </article>
            );
          })}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-14">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-text-primary">Global Reach</h2>
        <p className="mt-2 max-w-2xl text-sm text-text-secondary">
          Our premium recycled cotton fiber has strong and growing demand across key international spinning markets.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {globalMarkets.map((market) => (
            <span
              key={market}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
            >
              <Globe2 className="h-4 w-4 text-accent" />
              {market}
            </span>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-14">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-text-primary">Team</h2>
        <p className="mt-2 text-sm text-text-secondary">Click a name to view contact details.</p>
        <TeamGrid team={team} />
      </AnimatedSection>
    </div>
  );
}
