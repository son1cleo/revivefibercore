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

const categoryOptions = [
  { value: "General", hint: "Shows on the Work page only." },
  { value: "Machine In Production", hint: "Shows on Our Products → Recycled Fibers, and on the Work page." },
  { value: "Packing & Export", hint: "Shows on Our Products → Recycled Fibers, and on the Work page." },
  { value: "Wiping Rags", hint: "Shows on Our Products → Wiping Rags, and on the Work page." }
];

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
    data.append("folder", "images");

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

  const selectedCategoryHint = categoryOptions.find((option) => option.value === form.category)?.hint;

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

        <label className="block text-sm font-medium text-text-secondary">
          Category
          <select
            name="category"
            value={form.category}
            onChange={onChange}
            className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedCategoryHint ? <p className="!mt-1 text-xs text-text-muted">{selectedCategoryHint}</p> : null}

      {form.mediaType === "video" ? (
        <div className="rounded-xl border border-accent/30 bg-accent-bg p-4 text-sm text-text-secondary">
          <p className="font-semibold text-text-primary">Videos use an embed link, not a file upload.</p>
          <p className="mt-1">
            Upload your video to YouTube or Vimeo (Unlisted is fine), then paste its <strong>embed URL</strong> below — e.g.{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 text-xs">https://www.youtube.com/embed/VIDEO_ID</code>. Uploading a raw video
            file here won&apos;t play correctly and will quickly use up storage space.
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Media URL"
          name="mediaUrl"
          value={form.mediaUrl}
          onChange={onChange}
          required
          placeholder={form.mediaType === "video" ? "https://www.youtube.com/embed/VIDEO_ID" : undefined}
        />
        <Field label="Thumbnail URL" name="thumbnailUrl" value={form.thumbnailUrl} onChange={onChange} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Display Order" name="displayOrder" value={form.displayOrder} onChange={onChange} type="number" />
        <label className="mt-8 inline-flex items-center gap-2 text-sm text-text-secondary">
          <input type="checkbox" name="published" checked={form.published} onChange={onChange} />
          Publish now
        </label>
      </div>

      {form.mediaType === "image" ? (
        <label className="block text-sm font-medium text-text-secondary">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={onUpload}
            className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary"
          />
          <span className="mt-1 block text-xs text-text-muted">This fills in the Media URL field above automatically.</span>
        </label>
      ) : null}

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
