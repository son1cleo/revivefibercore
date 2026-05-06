"use client";

import { useState } from "react";
import { Upload, AlertCircle, CheckCircle } from "lucide-react";

export default function ClientForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    contact_person: "",
    email: "",
    phone: "",
    website: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null); // "success", "error", null
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrorMsg("Logo must be less than 5MB");
        return;
      }
      // Validate file type (image files only)
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorMsg("Logo must be an image (PNG, JPEG, or WebP)");
        return;
      }
      setFile(selectedFile);
      setErrorMsg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setErrorMsg("");
    setStatus(null);

    try {
      // Step 1: Upload logo if provided
      let logoUrl = null;
      if (file) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("bucket", "client-media");
        uploadFormData.append("folder", "logos");

        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadRes.ok) {
          throw new Error("Failed to upload logo");
        }

        const uploadData = await uploadRes.json();
        logoUrl = uploadData.publicUrl;
      }

      // Step 2: Submit client profile
      const submitRes = await fetch("/api/clients/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          logo_url: logoUrl,
        }),
      });

      if (!submitRes.ok) {
        throw new Error("Failed to submit profile");
      }

      setStatus("success");
      setFormData({
        name: "",
        company: "",
        contact_person: "",
        email: "",
        phone: "",
        website: "",
        description: "",
      });
      setFile(null);

      // Reset input
      const fileInput = document.getElementById("logo");
      if (fileInput) fileInput.value = "";
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-lg border border-border-light bg-white p-8">
      {status === "success" && (
        <div className="mb-6 flex items-start gap-3 rounded-lg bg-green-50 p-4">
          <CheckCircle className="mt-0.5 h-5 w-5 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-green-900">Profile Submitted</h3>
            <p className="mt-1 text-sm text-green-700">
              Thank you for your interest! We'll review your profile and get back to you soon.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-text-primary">Contact Name *</label>
            <input
              type="text"
              name="contact_person"
              value={formData.contact_person}
              onChange={handleInputChange}
              required
              className="mt-2 w-full rounded-lg border border-border-light bg-white px-4 py-2 text-text-primary placeholder-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary">Company Name *</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              required
              className="mt-2 w-full rounded-lg border border-border-light bg-white px-4 py-2 text-text-primary placeholder-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Your company"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary">Company Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-2 w-full rounded-lg border border-border-light bg-white px-4 py-2 text-text-primary placeholder-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Your company name"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-text-primary">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-2 w-full rounded-lg border border-border-light bg-white px-4 py-2 text-text-primary placeholder-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-lg border border-border-light bg-white px-4 py-2 text-text-primary placeholder-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="+880 1234 567890"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary">Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="mt-2 w-full rounded-lg border border-border-light bg-white px-4 py-2 text-text-primary placeholder-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary">Business Logo</label>
          <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-border-light bg-gray-50 p-6 hover:border-primary/50 hover:bg-primary/5 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-6 w-6 text-text-secondary" />
              <input
                id="logo"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="logo" className="cursor-pointer">
                <span className="text-sm font-medium text-primary hover:text-primary/80">Click to upload</span>
              </label>
              <p className="text-xs text-text-tertiary">or drag and drop</p>
              <p className="text-xs text-text-tertiary">PNG, JPEG, or WebP (max 5MB)</p>
              {file && <p className="mt-2 text-sm font-medium text-green-600">✓ {file.name}</p>}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary">Tell Us About Your Business</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={5}
            className="mt-2 w-full rounded-lg border border-border-light bg-white px-4 py-2 text-text-primary placeholder-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Share your business story, values, and what makes you special..."
          />
        </div>

        {errorMsg && status === "error" && (
          <div className="flex items-start gap-3 rounded-lg bg-red-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700">{errorMsg}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {uploading ? "Submitting..." : "Submit Profile"}
        </button>
      </form>
    </div>
  );
}
