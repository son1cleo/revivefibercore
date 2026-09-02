"use client";

import { useState } from "react";
import ImageGallery from "@/components/ImageGallery";

export default function ProductsShowcase({ categories }) {
  const [activeCategory, setActiveCategory] = useState(categories[0].key);
  const category = categories.find((item) => item.key === activeCategory);
  const [activeSub, setActiveSub] = useState(category.subcategories[0]?.key || null);

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    const next = categories.find((item) => item.key === key);
    setActiveSub(next.subcategories[0]?.key || null);
  };

  const activeSubcategory = category.subcategories.find((sub) => sub.key === activeSub);

  return (
    <div className="mt-8">
      <div className="panel flex flex-wrap gap-3 p-4">
        {categories.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => handleCategoryChange(item.key)}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition ${
              activeCategory === item.key ? "bg-accent text-bg" : "border border-border bg-surface text-text-secondary"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="panel mt-6 p-6 md:p-8">
        <p className="text-sm leading-relaxed text-text-secondary md:text-base">{category.description}</p>

        {category.colors && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-text-primary">Available Colors</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {category.colors.map((color) => (
                <span
                  key={color.name}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary"
                >
                  <span className="h-3.5 w-3.5 rounded-full border border-border/60" style={{ backgroundColor: color.hex }} />
                  {color.name}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-text-muted">
              Custom colors available on request — tailored shades for your mill&apos;s specifications.
            </p>
          </div>
        )}

        {category.applications && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-text-primary">Applications &amp; End Uses</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.applications.map((app) => (
                <span key={app} className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-text-secondary">
                  {app}
                </span>
              ))}
            </div>
          </div>
        )}

        {category.specs && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-text-primary">Technical Specifications</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {category.specs.map((spec) => (
                <div key={spec.label} className="panel-muted p-4">
                  <p className="text-xs uppercase tracking-wide text-text-muted">{spec.label}</p>
                  <p className="mt-1 text-sm font-semibold text-text-primary">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {category.subcategories.length > 0 && (
          <>
            <div className="mt-8 flex flex-wrap gap-3">
              {category.subcategories.map((sub) => (
                <button
                  key={sub.key}
                  type="button"
                  onClick={() => setActiveSub(sub.key)}
                  className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.06em] transition ${
                    activeSub === sub.key
                      ? "border border-accent bg-accent-bg text-accent"
                      : "border border-border text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {activeSubcategory && (
              <div className="mt-6">
                <ImageGallery items={activeSubcategory.images} />
              </div>
            )}
          </>
        )}

        {category.subcategories.length === 0 && (
          <p className="mt-6 text-sm text-text-muted">Product photos coming soon. Contact us for samples and specifications.</p>
        )}
      </div>
    </div>
  );
}
