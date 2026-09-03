import Link from "next/link";
import { Plus } from "lucide-react";
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
          <Link href="/admin/work/new" className="btn-primary inline-flex items-center gap-1.5">
            <Plus className="h-4 w-4" />
            New Work Item
          </Link>
        </div>

        <div className="mt-6 rounded-xl border border-accent/30 bg-accent-bg p-4 text-sm text-text-secondary">
          <p className="font-semibold text-text-primary">Where these show up</p>
          <p className="mt-1">
            Every published item here appears on the <strong>Work</strong> page. Items tagged{" "}
            <strong>Machine In Production</strong> or <strong>Packing & Export</strong> also appear under{" "}
            <strong>Our Products → Recycled Fibers</strong>, and items tagged <strong>Wiping Rags</strong> appear under{" "}
            <strong>Our Products → Wiping Rags</strong>. Use the Category field in the editor to control this.
          </p>
        </div>

        <div className="mt-6">
          <WorkList items={items} />
        </div>
      </div>
    </main>
  );
}
