import { notFound } from "next/navigation";
import ImpactStatEditor from "@/components/admin/ImpactStatEditor";
import { getAdminImpactStatById } from "@/lib/cms";

export default async function AdminEditImpactStatPage({ params }) {
  const { id } = await params;
  const item = await getAdminImpactStatById(id);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <p className="section-label">Admin / Impact Stats</p>
      <h1 className="mt-2 font-display text-3xl text-text-primary">Edit {item.year}</h1>
      <p className="mt-2 text-text-secondary">Update the water and carbon savings figures for this year.</p>
      <div className="mt-6">
        <ImpactStatEditor item={item} />
      </div>
    </div>
  );
}
