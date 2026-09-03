"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const PAGE_SIZE = 12;

export default function ImageGallery({ items }) {
  const [index, setIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleItems = items.slice(0, visibleCount);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, itemIndex) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setIndex(itemIndex)}
            className="panel group relative h-64 overflow-hidden"
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 33vw"
              quality={70}
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg to-transparent p-4 text-left text-sm font-medium text-text-primary">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      {visibleCount < items.length ? (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="btn-ghost"
          >
            Load More ({items.length - visibleCount} more)
          </button>
        </div>
      ) : null}

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={visibleItems.map((item) => ({ src: item.src }))}
        index={index}
      />
    </>
  );
}
