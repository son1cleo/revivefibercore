import { notFound } from "next/navigation";
import ColorEditor from "@/components/admin/ColorEditor";
import { getAdminProductColorById } from "@/lib/cms";

export default async function AdminEditColorPage({ params }) {
  const { id } = await params;
  const item = await getAdminProductColorById(id);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <p className="section-label">Admin / Colors</p>
      <h1 className="mt-2 font-display text-3xl text-text-primary">Edit Color</h1>
      <p className="mt-2 text-text-secondary">Update the name, hex value, order, or visibility.</p>
      <div className="mt-6">
        <ColorEditor item={item} />
      </div>
    </div>
  );
}
