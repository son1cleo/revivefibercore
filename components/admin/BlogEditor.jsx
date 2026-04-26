"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  title: "",
  slug: "",
  excerpt: "",
  author: "Revive Fiber Core Team",
  category: "Insights",
  coverImage: "",
  content: "",
  published: false
};

export default function BlogEditor({ post = null }) {
  const router = useRouter();
  const [form, setForm] = useState(
    post
      ? {
          title: post.title || "",
          slug: post.slug || "",
          excerpt: post.excerpt || "",
          author: post.author || "Revive Fiber Core Team",
          category: post.category || "Insights",
          coverImage: post.coverImage || "",
          content: post.content || "",
          published: Boolean(post.published)
        }
      : initialState
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const onUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);
    setMessage("");

    const data = new FormData();
    data.append("file", file);
    data.append("bucket", "blog-media");
    data.append("folder", "covers");

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: data
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Upload failed.");
      }

      setForm((prev) => ({ ...prev, coverImage: result.url }));
      setMessage("Image uploaded successfully.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const endpoint = post ? `/api/admin/posts/${post.id}` : "/api/admin/posts";
      const method = post ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Save failed.");
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="panel space-y-4 p-6">
      <Field label="Title" name="title" value={form.title} onChange={onChange} required />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Slug" name="slug" value={form.slug} onChange={onChange} />
        <Field label="Author" name="author" value={form.author} onChange={onChange} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Category" name="category" value={form.category} onChange={onChange} />
        <Field label="Cover Image URL" name="coverImage" value={form.coverImage} onChange={onChange} />
      </div>

      <label className="block text-sm font-medium text-text-secondary">
        Upload Cover Image
        <input
          type="file"
          accept="image/*"
          onChange={onUpload}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary"
        />
      </label>

      <label className="block text-sm font-medium text-text-secondary">
        Excerpt
        <textarea
          name="excerpt"
          rows={3}
          value={form.excerpt}
          onChange={onChange}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
        />
      </label>

      <label className="block text-sm font-medium text-text-secondary">
        Content (Markdown)
        <textarea
          name="content"
          rows={14}
          required
          value={form.content}
          onChange={onChange}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 font-mono text-sm text-text-primary outline-none transition focus:border-accent"
        />
      </label>

      <label className="inline-flex items-center gap-2 text-sm text-text-secondary">
        <input type="checkbox" name="published" checked={form.published} onChange={onChange} />
        Publish now
      </label>

      <button type="submit" disabled={saving || uploading} className="btn-primary disabled:opacity-70">
        {saving ? "Saving..." : post ? "Update Post" : "Create Post"}
      </button>

      {message ? <p className="text-sm text-text-secondary">{message}</p> : null}
      {uploading ? <p className="text-sm text-text-secondary">Uploading image...</p> : null}
    </form>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block text-sm font-medium text-text-secondary">
      {label}
      <input
        {...props}
        className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
      />
    </label>
  );
}
