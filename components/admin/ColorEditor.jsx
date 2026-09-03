"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ColorEditor({ item = null }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: item?.name || "",
    hex: item?.hex || "#2f7a54",
    displayOrder: item?.display_order?.toString() || "",
    published: item ? Boolean(item.published) : true
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const endpoint = item ? `/api/admin/colors/${item.id}` : "/api/admin/colors";
      const method = item ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          hex: form.hex,
          displayOrder: form.displayOrder === "" ? null : Number(form.displayOrder),
          published: form.published
        })
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Save failed.");
      }

      router.push("/admin/colors");
      router.refresh();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="panel space-y-4 p-6">
      <Field label="Color Name" name="name" value={form.name} onChange={onChange} placeholder="e.g. Kelly Green Shoddy" required />

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-text-secondary">
          Color
          <div className="mt-1 flex items-center gap-3">
            <input
              type="color"
              name="hex"
              value={form.hex}
              onChange={onChange}
              className="h-12 w-14 shrink-0 cursor-pointer rounded-lg border border-border bg-surface"
            />
            <input
              type="text"
              name="hex"
              value={form.hex}
              onChange={onChange}
              required
              pattern="^#[0-9a-fA-F]{6}$"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
            />
          </div>
        </label>

        <Field label="Display Order" name="displayOrder" value={form.displayOrder} onChange={onChange} type="number" />
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-text-secondary">
        <input type="checkbox" name="published" checked={form.published} onChange={onChange} />
        Show on Our Products page
      </label>

      <button type="submit" disabled={saving} className="btn-primary disabled:opacity-70">
        {saving ? "Saving..." : item ? "Update Color" : "Create Color"}
      </button>

      {message ? <p className="text-sm text-text-secondary">{message}</p> : null}
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
