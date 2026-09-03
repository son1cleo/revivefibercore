"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const categoryLabels = {
  "Machine In Production": "Recycled Fibers — Machine In Production",
  "Packing & Export": "Recycled Fibers — Packing & Export",
  "Wiping Rags": "Wiping Rags",
  "Sustainable Product Sampling": "Sustainable Product Sampling"
};

export default function ProductList({ items }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);

  const onDelete = async (id) => {
    const confirmed = window.confirm("Delete this product photo?");

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/admin/work/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete product.");
      }

      router.refresh();
    } catch {
      window.alert("Unable to delete this product.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article key={item.id} className="panel p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-text-muted">
                {categoryLabels[item.category] || item.category}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-text-primary">{item.title}</h3>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs ${item.published ? "bg-accent/15 text-accent" : "bg-surface-2 text-text-secondary"}`}>
              {item.published ? "Published" : "Draft"}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={`/admin/products/${item.id}`} className="rounded-full border border-border px-4 py-2 font-medium text-text-secondary hover:bg-surface-2 hover:text-text-primary">
              Edit
            </Link>
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              disabled={deletingId === item.id}
              className="rounded-full border border-red-500/40 px-4 py-2 font-medium text-red-300 hover:bg-red-500/10 disabled:opacity-60"
            >
              {deletingId === item.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </article>
      ))}

      {items.length === 0 ? <p className="text-sm text-text-secondary">No products found yet.</p> : null}
    </div>
  );
}
