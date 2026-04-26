import Link from "next/link";
import WorkList from "@/components/admin/WorkList";
import { getAllAdminWorkItems } from "@/lib/cms";

export default async function AdminWorkPage() {
  const items = await getAllAdminWorkItems();

  return (
    <main className="page-shell py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-label">Admin / Work</p>
            <h1 className="mt-2 font-display text-4xl text-text-primary">Work Items</h1>
            <p className="mt-2 text-sm text-text-secondary">Showcase completed projects and media.</p>
          </div>
          <Link href="/admin/work/new" className="btn-primary">
            New Work Item
          </Link>
        </div>

        <div className="mt-8">
          <WorkList items={items} />
        </div>
      </div>
    </main>
  );
}
