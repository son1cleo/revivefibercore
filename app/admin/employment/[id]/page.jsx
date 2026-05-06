import { notFound } from "next/navigation";
import EmploymentEditor from "@/components/admin/EmploymentEditor";
import { getAdminEmploymentApplicationById } from "@/lib/cms";

export default async function AdminEditEmploymentPage({ params }) {
  const { id } = await params;
  const item = await getAdminEmploymentApplicationById(id);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <p className="section-label">Admin / Employment</p>
      <h1 className="mt-2 font-display text-3xl text-text-primary">Edit Application</h1>
      <p className="mt-2 text-text-secondary">Update hiring status, notes, and candidate details.</p>
      <div className="mt-6">
        <EmploymentEditor item={item} />
      </div>
    </div>
  );
}
