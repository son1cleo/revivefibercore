import Link from "next/link";
import { Plus } from "lucide-react";
import ColorList from "@/components/admin/ColorList";
import { getAllAdminProductColors } from "@/lib/cms";

export default async function AdminColorsPage() {
  const items = await getAllAdminProductColors();

  return (
    <main className="page-shell py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-label">Admin / Colors</p>
            <h1 className="mt-2 font-display text-4xl text-text-primary">Colors</h1>
            <p className="mt-2 text-sm text-text-secondary">Manage the "Available Colors" shown under Our Products → Recycled Fibers.</p>
          </div>
          <Link href="/admin/colors/new" className="btn-primary inline-flex items-center gap-1.5">
            <Plus className="h-4 w-4" />
            Add Color
          </Link>
        </div>

        <div className="mt-8">
          <ColorList items={items} />
        </div>
      </div>
    </main>
  );
}
