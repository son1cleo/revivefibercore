"use client";

import { useMemo, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import ImageGallery from "@/components/ImageGallery";
import VideoGallery from "@/components/VideoGallery";
import BlogCard from "@/components/BlogCard";
import { workMedia } from "@/lib/content";

const tabs = ["Images", "Videos", "Blogs"];

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState("Images");

  const activeContent = useMemo(() => {
    if (activeTab === "Images") {
      return <ImageGallery items={workMedia.images} />;
    }

    if (activeTab === "Videos") {
      return <VideoGallery items={workMedia.videos} />;
    }

    return (
      <div className="grid gap-5 md:grid-cols-2">
        {workMedia.blogs.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    );
  }, [activeTab]);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-16">
      <AnimatedSection>
        <p className="text-xs uppercase tracking-[0.2em] text-olive">Showcase</p>
        <h1 className="mt-2 text-4xl font-bold text-charcoal">Our Work in Action</h1>
      </AnimatedSection>

      <AnimatedSection className="mt-8" delay={0.05}>
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                activeTab === tab ? "bg-forest text-cream" : "border border-forest/20 bg-white text-charcoal"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-8" delay={0.1}>
        {activeContent}
      </AnimatedSection>
    </div>
  );
}
