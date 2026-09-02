import { notFound } from "next/navigation";
import ClientEditor from "@/components/admin/ClientEditor";
import { getAdminClientById } from "@/lib/cms";

export default async function AdminEditClientPage({ params }) {
  const { id } = await params;
  const item = await getAdminClientById(id);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <p className="section-label">Admin / Clients</p>
      <h1 className="mt-2 font-display text-3xl text-text-primary">Edit Client</h1>
      <p className="mt-2 text-text-secondary">Update company info, media, and publish status.</p>
      <div className="mt-6">
        <ClientEditor item={item} />
      </div>
    </div>
  );
}
