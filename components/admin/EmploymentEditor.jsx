"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  resumeUrl: "",
  coverLetter: "",
  status: "applied",
  notes: ""
};

export default function EmploymentEditor({ item = null }) {
  const router = useRouter();
  const [form, setForm] = useState(
    item
      ? {
          fullName: item.full_name || "",
          email: item.email || "",
          phone: item.phone || "",
          position: item.position || "",
          resumeUrl: item.resume_url || "",
          coverLetter: item.cover_letter || "",
          status: item.status || "applied",
          notes: item.notes || ""
        }
      : initialState
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
    data.append("bucket", "careers-media");
    data.append("folder", "resumes");

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: data
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Upload failed.");
      }

      setForm((prev) => ({ ...prev, resumeUrl: result.url }));
      setMessage("Resume uploaded successfully.");
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
      const endpoint = item ? `/api/admin/employment/${item.id}` : "/api/admin/employment";
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

      router.push("/admin/employment");
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
        <Field label="Full Name" name="fullName" value={form.fullName} onChange={onChange} required />
        <Field label="Email" name="email" value={form.email} onChange={onChange} type="email" required />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Phone" name="phone" value={form.phone} onChange={onChange} />
        <Field label="Position" name="position" value={form.position} onChange={onChange} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Resume URL" name="resumeUrl" value={form.resumeUrl} onChange={onChange} />
        <label className="block text-sm font-medium text-text-secondary">
          Status
          <select
            name="status"
            value={form.status}
            onChange={onChange}
            className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
          >
            <option value="applied">Applied</option>
            <option value="reviewing">Reviewing</option>
            <option value="interview">Interview</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
      </div>

      <label className="block text-sm font-medium text-text-secondary">
        Upload Resume
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={onUpload}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary"
        />
      </label>

      <label className="block text-sm font-medium text-text-secondary">
        Cover Letter
        <textarea
          name="coverLetter"
          rows={4}
          value={form.coverLetter}
          onChange={onChange}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
        />
      </label>

      <label className="block text-sm font-medium text-text-secondary">
        Internal Notes
        <textarea
          name="notes"
          rows={4}
          value={form.notes}
          onChange={onChange}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
        />
      </label>

      <button type="submit" disabled={saving || uploading} className="btn-primary disabled:opacity-70">
        {saving ? "Saving..." : item ? "Update Application" : "Create Application"}
      </button>

      {message ? <p className="text-sm text-text-secondary">{message}</p> : null}
      {uploading ? <p className="text-sm text-text-secondary">Uploading resume...</p> : null}
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
