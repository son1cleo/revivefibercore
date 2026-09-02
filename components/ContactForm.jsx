"use client";

import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

const FORM_ENDPOINT = "https://formsubmit.co/ajax/sajidurrahmansiddiky@gmail.com";

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
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          _subject: `Website Contact: ${form.subject}`,
          _template: "table",
          _captcha: "false"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      setStatus({ type: "success", message: "Thanks! Your message has been sent." });
      setForm(initialState);
    } catch (error) {
      setStatus({ type: "error", message: "Unable to send message right now. Please try again or reach us on WhatsApp." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>
      <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} required />
      <label className="block text-sm font-medium text-text-secondary">
        Message
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {status && (
        <p className={`text-sm ${status.type === "success" ? "text-accent" : "text-red-300"}`}>{status.message}</p>
      )}
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
