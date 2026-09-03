"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const sectionsByCategory = {
  "recycled-fibers": ["Machine In Production", "Packing & Export"],
  "wiping-rags": ["Wiping Rags"],
  "sustainable-sampling": ["Sustainable Product Sampling"]
};

function deriveProductCategory(category) {
  if (category === "Wiping Rags") {
    return { productCategory: "wiping-rags", section: "Wiping Rags" };
  }

  if (category === "Sustainable Product Sampling") {
    return { productCategory: "sustainable-sampling", section: "Sustainable Product Sampling" };
  }

  if (category === "Machine In Production" || category === "Packing & Export") {
    return { productCategory: "recycled-fibers", section: category };
  }

  return { productCategory: "recycled-fibers", section: "Machine In Production" };
}

export default function ProductEditor({ item = null }) {
  const router = useRouter();
  const initial = item
    ? deriveProductCategory(item.category)
    : { productCategory: "recycled-fibers", section: "Machine In Production" };

  const [form, setForm] = useState({
    title: item?.title || "",
    description: item?.description || "",
    mediaUrl: item?.media_url || "",
    displayOrder: item?.display_order?.toString() || "",
    published: Boolean(item?.published),
    productCategory: initial.productCategory,
    section: initial.section
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const onProductCategoryChange = (event) => {
    const productCategory = event.target.value;
    setForm((prev) => ({
      ...prev,
      productCategory,
      section: sectionsByCategory[productCategory][0]
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
    data.append("bucket", "work-media");
    data.append("folder", "products");

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

    if (!form.mediaUrl) {
      setMessage("Please upload an image first.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const endpoint = item ? `/api/admin/work/${item.id}` : "/api/admin/work";
      const method = item ? "PATCH" : "POST";
      const category = form.section;

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          mediaType: "image",
          mediaUrl: form.mediaUrl,
          category,
          displayOrder: form.displayOrder === "" ? null : Number(form.displayOrder),
          published: form.published
        })
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Save failed.");
      }

      router.push("/admin/products");
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
          Product
          <select
            name="productCategory"
            value={form.productCategory}
            onChange={onProductCategoryChange}
            className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
          >
            <option value="recycled-fibers">Recycled Fibers</option>
            <option value="wiping-rags">Wiping Rags</option>
            <option value="sustainable-sampling">Sustainable Product Sampling</option>
          </select>
        </label>

        {form.productCategory === "recycled-fibers" && (
          <label className="block text-sm font-medium text-text-secondary">
            Section
            <select
              name="section"
              value={form.section}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
            >
              {sectionsByCategory["recycled-fibers"].map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      <p className="!mt-1 text-xs text-text-muted">
        Controls where this photo shows on the Our Products page.
      </p>

      <label className="block text-sm font-medium text-text-secondary">
        Photo
        <input
          type="file"
          accept="image/*"
          onChange={onUpload}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary"
        />
      </label>

      {form.mediaUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={form.mediaUrl} alt="Uploaded preview" className="h-40 w-full rounded-xl border border-border object-cover" />
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Display Order" name="displayOrder" value={form.displayOrder} onChange={onChange} type="number" />
        <label className="mt-8 inline-flex items-center gap-2 text-sm text-text-secondary">
          <input type="checkbox" name="published" checked={form.published} onChange={onChange} />
          Publish now
        </label>
      </div>

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
        {saving ? "Saving..." : item ? "Update Product" : "Create Product"}
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
