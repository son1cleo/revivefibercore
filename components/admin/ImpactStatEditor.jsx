"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ImpactStatEditor({ item = null }) {
  const router = useRouter();
  const [form, setForm] = useState({
    year: item?.year?.toString() || new Date().getFullYear().toString(),
    waterSavedLiters: item?.water_saved_liters?.toString() || "",
    carbonSavedKg: item?.carbon_saved_kg?.toString() || "",
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
      const endpoint = item ? `/api/admin/impact/${item.id}` : "/api/admin/impact";
      const method = item ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year: form.year,
          waterSavedLiters: form.waterSavedLiters === "" ? 0 : Number(form.waterSavedLiters),
          carbonSavedKg: form.carbonSavedKg === "" ? 0 : Number(form.carbonSavedKg),
          published: form.published
        })
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Save failed.");
      }

      router.push("/admin/impact");
      router.refresh();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="panel space-y-4 p-6">
      <Field label="Year" name="year" value={form.year} onChange={onChange} type="number" min="2000" max="2100" required />

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Water Saved (Liters)"
          name="waterSavedLiters"
          value={form.waterSavedLiters}
          onChange={onChange}
          type="number"
          step="any"
          min="0"
          placeholder="e.g. 4500000"
        />
        <Field
          label="Carbon Emission Saved (kg CO2e)"
          name="carbonSavedKg"
          value={form.carbonSavedKg}
          onChange={onChange}
          type="number"
          step="any"
          min="0"
          placeholder="e.g. 128000"
        />
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-text-secondary">
        <input type="checkbox" name="published" checked={form.published} onChange={onChange} />
        Show on About page
      </label>

      <button type="submit" disabled={saving} className="btn-primary disabled:opacity-70">
        {saving ? "Saving..." : item ? "Update Year" : "Add Year"}
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
