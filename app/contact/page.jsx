import AnimatedSection from "@/components/AnimatedSection";
import ProductsShowcase from "@/components/ProductsShowcase";
import { productCategories } from "@/lib/content";
import { getPublishedWorkItemsByCategory } from "@/lib/cms";

export const metadata = {
  title: "Our Products | Revive Fiber Co",
  description: "Explore Revive Fiber Co's recycled fiber and wiping rag products."
};

export default async function ProductsPage() {
  const [machineImages, packingImages, wipingRagsImages] = await Promise.all([
    getPublishedWorkItemsByCategory("Machine In Production"),
    getPublishedWorkItemsByCategory("Packing & Export"),
    getPublishedWorkItemsByCategory("Wiping Rags")
  ]);

  const categories = productCategories.map((category) => {
    if (category.key === "recycled-fibers") {
      return {
        ...category,
        subcategories: category.subcategories.map((sub) => {
          if (sub.key === "machine-in-production" && machineImages) {
            return { ...sub, images: machineImages };
          }

          if (sub.key === "packing-export" && packingImages) {
            return { ...sub, images: packingImages };
          }

          return sub;
        })
      };
    }

    if (category.key === "wiping-rags" && wipingRagsImages) {
      return {
        ...category,
        subcategories: [{ key: "wiping-rags-gallery", label: "Gallery", images: wipingRagsImages }]
      };
    }

    return category;
  });

  return (
    <div className="page-shell py-16">
      <AnimatedSection className="panel p-8 md:p-12">
        <p className="section-label">03 - Our Products</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,4vw,4rem)] leading-[1.1] text-text-primary">Our Products</h1>
        <p className="mt-4 max-w-2xl text-text-secondary">
          Premium recycled cotton fiber and wiping rags, produced through advanced mechanical recycling near Dhaka.
        </p>
      </AnimatedSection>

      <ProductsShowcase categories={categories} />
    </div>
  );
}
