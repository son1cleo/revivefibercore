import Link from "next/link";
import { Plus } from "lucide-react";
import ProductList from "@/components/admin/ProductList";
import { getAllAdminProductItems } from "@/lib/cms";

export default async function AdminProductsPage() {
  const items = await getAllAdminProductItems();

  return (
    <main className="page-shell py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-label">Admin / Products</p>
            <h1 className="mt-2 font-display text-4xl text-text-primary">Products</h1>
            <p className="mt-2 text-sm text-text-secondary">Manage the photos shown on the Our Products page.</p>
          </div>
          <Link href="/admin/products/new" className="btn-primary inline-flex items-center gap-1.5">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>

        <div className="mt-6 rounded-xl border border-accent/30 bg-accent-bg p-4 text-sm text-text-secondary">
          <p className="font-semibold text-text-primary">Where these show up</p>
          <p className="mt-1">
            Choose <strong>Recycled Fibers</strong> and a section (<strong>Machine In Production</strong> or{" "}
            <strong>Packing &amp; Export</strong>), <strong>Wiping Rags</strong>, or{" "}
            <strong>Sustainable Product Sampling</strong> (the sliding gallery under Available Colors). Published items
            appear immediately under the matching section on the Our Products page, and most also show in the general
            Work gallery. Want to edit the color swatches instead? See{" "}
            <Link href="/admin/colors" className="underline">
              Colors
            </Link>
            .
          </p>
        </div>

        <div className="mt-6">
          <ProductList items={items} />
        </div>
      </div>
    </main>
  );
}
