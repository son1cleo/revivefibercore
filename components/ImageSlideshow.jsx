"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ImageSlideshow({ items, intervalMs = 4000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const timerRef = useRef(null);

  const goTo = (i) => setIndex((i + items.length) % items.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (paused || items.length <= 1) {
      return undefined;
    }

    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, intervalMs);

    return () => clearInterval(timerRef.current);
  }, [paused, items.length, intervalMs]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      className="group relative mt-4 h-56 w-full overflow-hidden rounded-2xl sm:h-64 md:h-72"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {items.map((item, i) => (
        <button
          key={item.src}
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`View ${item.title}`}
          aria-hidden={i !== index}
          tabIndex={i === index ? 0 : -1}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={item.src}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
            priority={i === 0}
          />
        </button>
      ))}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {items[index].title}
      </span>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-sm transition duration-200 hover:bg-black/85"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-sm transition duration-200 hover:bg-black/85"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
            {items.map((item, i) => (
              <button
                key={item.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-white" : "w-1.5 bg-white/55 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={index}
        slides={items.map((item) => ({ src: item.src, title: item.title }))}
        on={{ view: ({ index: viewIndex }) => setIndex(viewIndex) }}
      />
    </div>
  );
}
