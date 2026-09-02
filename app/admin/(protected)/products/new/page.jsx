import ProductEditor from "@/components/admin/ProductEditor";

export default function AdminNewProductPage() {
  return (
    <div>
      <p className="section-label">Admin / Products</p>
      <h1 className="mt-2 font-display text-3xl text-text-primary">Add Product</h1>
      <p className="mt-2 text-text-secondary">Add a new photo to Recycled Fibers or Wiping Rags.</p>
      <div className="mt-6">
        <ProductEditor />
      </div>
    </div>
  );
}
