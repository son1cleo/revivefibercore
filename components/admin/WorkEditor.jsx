"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  title: "",
  description: "",
  mediaType: "image",
  mediaUrl: "",
  thumbnailUrl: "",
  category: "General",
  displayOrder: "",
  published: false
};

export default function WorkEditor({ item = null }) {
  const router = useRouter();
  const [form, setForm] = useState(
    item
      ? {
          title: item.title || "",
          description: item.description || "",
          mediaType: item.media_type || "image",
          mediaUrl: item.media_url || "",
          thumbnailUrl: item.thumbnail_url || "",
          category: item.category || "General",
          displayOrder: item.display_order?.toString() || "",
          published: Boolean(item.published)
        }
      : initialState
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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
    data.append("bucket", "work-media");
    data.append("folder", form.mediaType === "image" ? "images" : "videos");

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: data
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Upload failed.");
      }

      setForm((prev) => ({ ...prev, mediaUrl: result.url }));
      setMessage("Media uploaded successfully.");
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
      const endpoint = item ? `/api/admin/work/${item.id}` : "/api/admin/work";
      const method = item ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          displayOrder: form.displayOrder === "" ? null : Number(form.displayOrder)
        })
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Save failed.");
      }

      router.push("/admin/work");
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
        <label className="block text-sm font-medium text-text-secondary">
          Media Type
          <select
            name="mediaType"
            value={form.mediaType}
            onChange={onChange}
            className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </label>

        <Field label="Category" name="category" value={form.category} onChange={onChange} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Media URL" name="mediaUrl" value={form.mediaUrl} onChange={onChange} required />
        <Field label="Thumbnail URL" name="thumbnailUrl" value={form.thumbnailUrl} onChange={onChange} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Display Order" name="displayOrder" value={form.displayOrder} onChange={onChange} type="number" />
        <label className="mt-8 inline-flex items-center gap-2 text-sm text-text-secondary">
          <input type="checkbox" name="published" checked={form.published} onChange={onChange} />
          Publish now
        </label>
      </div>

      <label className="block text-sm font-medium text-text-secondary">
        Upload Media
        <input
          type="file"
          accept={form.mediaType === "image" ? "image/*" : "video/*"}
          onChange={onUpload}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary"
        />
      </label>

      <label className="block text-sm font-medium text-text-secondary">
        Description
        <textarea
          name="description"
          rows={4}
          value={form.description}
          onChange={onChange}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
        />
      </label>

      <button type="submit" disabled={saving || uploading} className="btn-primary disabled:opacity-70">
        {saving ? "Saving..." : item ? "Update Work Item" : "Create Work Item"}
      </button>

      {message ? <p className="text-sm text-text-secondary">{message}</p> : null}
      {uploading ? <p className="text-sm text-text-secondary">Uploading media...</p> : null}
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
