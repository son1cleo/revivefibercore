import HeroSection from "@/components/HeroSection";
import AboutSnippet from "@/components/AboutSnippet";
import WhatWeDo from "@/components/WhatWeDo";
import WorkPreview from "@/components/WorkPreview";
import StatsBar from "@/components/StatsBar";
import CTABanner from "@/components/CTABanner";
import { featuredWork, homeStats, whyChooseUs } from "@/lib/content";

export const metadata = {
  title: "Home | Revive Fiber Co",
  description: "Bringing fiber back to life with sustainable recycled textile processing."
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSnippet />
      <WhatWeDo items={whyChooseUs} />
      <WorkPreview items={featuredWork} />
      <StatsBar stats={homeStats} />
      <CTABanner />
    </>
  );
}
