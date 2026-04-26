"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BlogList({ posts }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);

  const onDelete = async (id) => {
    const confirmed = window.confirm("Delete this blog post?");

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete post.");
      }

      router.refresh();
    } catch {
      window.alert("Unable to delete this post.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <article key={post.id || post.slug} className="panel p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-text-muted">{post.category || "Insights"}</p>
              <h3 className="mt-1 text-lg font-semibold text-text-primary">{post.title}</h3>
              <p className="mt-1 text-xs text-text-secondary">{new Date(post.date).toLocaleDateString()}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs ${post.published ? "bg-accent/15 text-accent" : "bg-surface-2 text-text-secondary"}`}>
              {post.published ? "Published" : "Draft"}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            {post.id ? (
              <Link href={`/admin/blogs/${post.id}`} className="rounded-full border border-border px-4 py-2 font-medium text-text-secondary hover:bg-surface-2 hover:text-text-primary">
                Edit
              </Link>
            ) : null}

            {post.id ? (
              <button
                type="button"
                onClick={() => onDelete(post.id)}
                disabled={deletingId === post.id}
                className="rounded-full border border-red-500/40 px-4 py-2 font-medium text-red-300 hover:bg-red-500/10 disabled:opacity-60"
              >
                {deletingId === post.id ? "Deleting..." : "Delete"}
              </button>
            ) : null}
          </div>
        </article>
      ))}

      {posts.length === 0 ? <p className="text-sm text-text-secondary">No blog posts found yet.</p> : null}
    </div>
  );
}
