import AnimatedSection from "@/components/AnimatedSection";
import WorkTabs from "@/components/WorkTabs";
import { getPublishedWorkItems } from "@/lib/cms";

export default async function WorkPage() {
  const work = await getPublishedWorkItems();

  return (
    <div className="page-shell py-16">
      <AnimatedSection className="panel p-8 md:p-12">
        <p className="section-label">01 - Our Work</p>
        <h1 className="mt-2 font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.08] text-text-primary">Our Work in Action</h1>
      </AnimatedSection>

      <WorkTabs images={work.images} videos={work.videos} />
    </div>
  );
}
