"use client";

import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message.");
      }

      setStatus({ type: "success", message: "Thanks! Your message has been sent." });
      setForm(initialState);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-forest/10 bg-white p-6 shadow-soft">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>
      <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} required />
      <label className="block text-sm font-medium text-charcoal">
        Message
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="mt-1 w-full rounded-xl border border-forest/20 px-4 py-3 outline-none transition focus:border-forest focus:ring-2 focus:ring-sage/40"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition hover:bg-olive disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {status && (
        <p className={`text-sm ${status.type === "success" ? "text-forest" : "text-red-600"}`}>{status.message}</p>
      )}
    </form>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block text-sm font-medium text-charcoal">
      {label}
      <input
        {...props}
        className="mt-1 w-full rounded-xl border border-forest/20 px-4 py-3 outline-none transition focus:border-forest focus:ring-2 focus:ring-sage/40"
      />
    </label>
  );
}
