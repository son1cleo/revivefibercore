"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  name: "",
  company: "",
  contactPerson: "",
  email: "",
  phone: "",
  website: "",
  logoUrl: "",
  description: "",
  published: false
};

export default function ClientEditor({ item = null }) {
  const router = useRouter();
  const [form, setForm] = useState(
    item
      ? {
          name: item.name || "",
          company: item.company || "",
          contactPerson: item.contact_person || "",
          email: item.email || "",
          phone: item.phone || "",
          website: item.website || "",
          logoUrl: item.logo_url || "",
          description: item.description || "",
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
    data.append("bucket", "client-media");
    data.append("folder", "logos");

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: data
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Upload failed.");
      }

      setForm((prev) => ({ ...prev, logoUrl: result.url }));
      setMessage("Logo uploaded successfully.");
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
      const endpoint = item ? `/api/admin/clients/${item.id}` : "/api/admin/clients";
      const method = item ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Save failed.");
      }

      router.push("/admin/clients");
      router.refresh();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="panel space-y-4 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" value={form.name} onChange={onChange} required />
        <Field label="Company" name="company" value={form.company} onChange={onChange} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Contact Person" name="contactPerson" value={form.contactPerson} onChange={onChange} />
        <Field label="Email" name="email" value={form.email} onChange={onChange} type="email" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Phone" name="phone" value={form.phone} onChange={onChange} />
        <Field label="Website" name="website" value={form.website} onChange={onChange} placeholder="https://" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Logo URL" name="logoUrl" value={form.logoUrl} onChange={onChange} />
        <label className="mt-8 inline-flex items-center gap-2 text-sm text-text-secondary">
          <input type="checkbox" name="published" checked={form.published} onChange={onChange} />
          Publish on site
        </label>
      </div>

      <label className="block text-sm font-medium text-text-secondary">
        Upload Logo
        <input
          type="file"
          accept="image/*"
          onChange={onUpload}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary"
        />
      </label>

      <label className="block text-sm font-medium text-text-secondary">
        Description
        <textarea
          name="description"
          rows={5}
          value={form.description}
          onChange={onChange}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
        />
      </label>

      <button type="submit" disabled={saving || uploading} className="btn-primary disabled:opacity-70">
        {saving ? "Saving..." : item ? "Update Client" : "Create Client"}
      </button>

      {message ? <p className="text-sm text-text-secondary">{message}</p> : null}
      {uploading ? <p className="text-sm text-text-secondary">Uploading logo...</p> : null}
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
