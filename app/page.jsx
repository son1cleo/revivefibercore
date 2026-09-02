import HeroSection from "@/components/HeroSection";
import AboutSnippet from "@/components/AboutSnippet";
import WhatWeDo from "@/components/WhatWeDo";
import StatsBar from "@/components/StatsBar";
import CTABanner from "@/components/CTABanner";
import { homeStats, whyChooseUs } from "@/lib/content";

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
      <StatsBar stats={homeStats} />
      <CTABanner />
    </>
  );
}
