"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ColorList({ items }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);

  const onDelete = async (id) => {
    const confirmed = window.confirm("Delete this color?");

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/admin/colors/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete color.");
      }

      router.refresh();
    } catch {
      window.alert("Unable to delete this color.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.id} className="panel p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 shrink-0 rounded-full border border-border/60" style={{ backgroundColor: item.hex }} />
              <div>
                <h3 className="font-semibold text-text-primary">{item.name}</h3>
                <p className="text-xs uppercase text-text-muted">{item.hex}</p>
              </div>
            </div>
            <span className={`shrink-0 rounded-full px-3 py-1 text-xs ${item.published ? "bg-accent/15 text-accent" : "bg-surface-2 text-text-secondary"}`}>
              {item.published ? "Live" : "Hidden"}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={`/admin/colors/${item.id}`} className="rounded-full border border-border px-4 py-2 font-medium text-text-secondary hover:bg-surface-2 hover:text-text-primary">
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

      {items.length === 0 ? <p className="text-sm text-text-secondary">No colors found yet.</p> : null}
    </div>
  );
}
