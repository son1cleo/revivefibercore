"use client";

import { useMemo, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import ImageGallery from "@/components/ImageGallery";
import VideoGallery from "@/components/VideoGallery";
import BlogCard from "@/components/BlogCard";

const tabs = ["Images", "Videos", "Blogs"];

export default function WorkTabs({ images, videos, blogs }) {
  const [activeTab, setActiveTab] = useState("Images");

  const activeContent = useMemo(() => {
    if (activeTab === "Images") {
      return <ImageGallery items={images} />;
    }

    if (activeTab === "Videos") {
      return <VideoGallery items={videos} />;
    }

    return (
      <div className="grid gap-5 md:grid-cols-2">
        {blogs.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    );
  }, [activeTab, images, videos, blogs]);

  return (
    <>
      <AnimatedSection className="mt-8" delay={0.05}>
        <div className="panel flex flex-wrap gap-3 p-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition ${
                activeTab === tab ? "bg-accent text-bg" : "border border-border bg-surface text-text-secondary"
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
    </>
  );
}
