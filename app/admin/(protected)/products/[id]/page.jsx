import { notFound } from "next/navigation";
import ProductEditor from "@/components/admin/ProductEditor";
import { getAdminWorkById } from "@/lib/cms";

export default async function AdminEditProductPage({ params }) {
  const { id } = await params;
  const item = await getAdminWorkById(id);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <p className="section-label">Admin / Products</p>
      <h1 className="mt-2 font-display text-3xl text-text-primary">Edit Product</h1>
      <p className="mt-2 text-text-secondary">Update the photo, section, order, and publish status.</p>
      <div className="mt-6">
        <ProductEditor item={item} />
      </div>
    </div>
  );
}
