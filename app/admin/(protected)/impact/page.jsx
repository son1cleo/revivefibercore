import Link from "next/link";
import { Plus } from "lucide-react";
import ImpactStatList from "@/components/admin/ImpactStatList";
import { getAllAdminImpactStats } from "@/lib/cms";

export default async function AdminImpactPage() {
  const items = await getAllAdminImpactStats();

  return (
    <main className="page-shell py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-label">Admin / Impact Stats</p>
            <h1 className="mt-2 font-display text-4xl text-text-primary">Impact Stats</h1>
            <p className="mt-2 text-sm text-text-secondary">
              Update the yearly Water Saved and Carbon Emission Saved figures shown on the About page.
            </p>
          </div>
          <Link href="/admin/impact/new" className="btn-primary inline-flex items-center gap-1.5">
            <Plus className="h-4 w-4" />
            Add Year
          </Link>
        </div>

        <div className="mt-6">
          <ImpactStatList items={items} />
        </div>
      </div>
    </main>
  );
}
