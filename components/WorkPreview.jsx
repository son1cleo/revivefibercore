"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import AnimatedSection from "./AnimatedSection";
import { sustainableSamplingImages } from "@/lib/content";

export default function WorkPreview({ items }) {
  const [open, setOpen] = useState(false);

  return (
    <AnimatedSection className="page-shell py-14" delay={0.05}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="section-label">03 - Work</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.12] text-text-primary">Featured Projects</h2>
        </div>
        <Link href="/work" className="text-sm font-medium text-text-secondary hover:text-accent">
          View Full Showcase
        </Link>
      </div>

      <div className="mt-7 grid gap-5">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpen(true)}
            className="panel group relative overflow-hidden text-left"
          >
            <div className="relative h-72 overflow-hidden md:h-[26rem]">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/10 to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-text-primary">{item.title}</h3>
              <p className="mt-1 text-sm text-text-secondary">Click to view the photo gallery</p>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={sustainableSamplingImages.map((image) => ({ src: image.src, title: image.title }))}
        plugins={[Thumbnails, Slideshow]}
        slideshow={{ autoplay: false, delay: 3500 }}
      />
    </AnimatedSection>
  );
}
