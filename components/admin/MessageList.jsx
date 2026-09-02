"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function MessageList({ items }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = async (item) => {
    const opening = expandedId !== item.id;
    setExpandedId(opening ? item.id : null);

    if (opening && !item.read) {
      setBusyId(item.id);
      try {
        await fetch(`/api/admin/messages/${item.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ read: true })
        });
        router.refresh();
      } catch {
        // ignore - non-critical
      } finally {
        setBusyId(null);
      }
    }
  };

  const onDelete = async (id) => {
    const confirmed = window.confirm("Delete this message?");

    if (!confirmed) {
      return;
    }

    setBusyId(id);

    try {
      const response = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete message.");
      }

      router.refresh();
    } catch {
      window.alert("Unable to delete this message.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isExpanded = expandedId === item.id;

        return (
          <article key={item.id} className="panel p-5">
            <button type="button" onClick={() => toggleExpand(item)} className="flex w-full flex-wrap items-start justify-between gap-3 text-left">
              <div>
                <div className="flex items-center gap-2">
                  {!item.read && <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-label="Unread" />}
                  <h3 className="text-lg font-semibold text-text-primary">{item.subject}</h3>
                </div>
                <p className="mt-1 text-xs text-text-secondary">
                  {item.name} · {item.email}
                </p>
              </div>
              <span className="text-xs text-text-muted">{formatDate(item.created_at)}</span>
            </button>

            {isExpanded && (
              <div className="mt-4 space-y-4 border-t border-border/70 pt-4">
                <p className="whitespace-pre-wrap text-sm text-text-secondary">{item.message}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <a href={`mailto:${item.email}`} className="rounded-full border border-border px-4 py-2 font-medium text-text-secondary hover:bg-surface-2 hover:text-text-primary">
                    Reply by Email
                  </a>
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    disabled={busyId === item.id}
                    className="rounded-full border border-red-500/40 px-4 py-2 font-medium text-red-300 hover:bg-red-500/10 disabled:opacity-60"
                  >
                    {busyId === item.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            )}
          </article>
        );
      })}

      {items.length === 0 ? <p className="text-sm text-text-secondary">No messages yet.</p> : null}
    </div>
  );
}
