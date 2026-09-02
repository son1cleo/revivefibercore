import { notFound } from "next/navigation";
import WorkEditor from "@/components/admin/WorkEditor";
import { getAdminWorkById } from "@/lib/cms";

export default async function AdminEditWorkPage({ params }) {
  const { id } = await params;
  const item = await getAdminWorkById(id);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <p className="section-label">Admin / Work</p>
      <h1 className="mt-2 font-display text-3xl text-text-primary">Edit Work Item</h1>
      <p className="mt-2 text-text-secondary">Update media, details, order, and publish status.</p>
      <div className="mt-6">
        <WorkEditor item={item} />
      </div>
    </div>
  );
}
