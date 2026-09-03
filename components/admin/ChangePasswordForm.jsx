"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function ChangePasswordForm({ email }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);

    if (newPassword.length < 6) {
      setStatus({ type: "error", message: "New password must be at least 6 characters." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus({ type: "error", message: "New password and confirmation do not match." });
      return;
    }

    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();

      const { error: verifyError } = await supabase.auth.signInWithPassword({ email, password: currentPassword });

      if (verifyError) {
        throw new Error("Current password is incorrect.");
      }

      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

      if (updateError) {
        throw updateError;
      }

      setStatus({ type: "success", message: "Password updated successfully." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to update password." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="panel space-y-4 p-6">
      <label className="block text-sm font-medium text-text-secondary">
        Current Password
        <input
          type="password"
          required
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
        />
      </label>

      <label className="block text-sm font-medium text-text-secondary">
        New Password
        <input
          type="password"
          required
          minLength={6}
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
        />
      </label>

      <label className="block text-sm font-medium text-text-secondary">
        Confirm New Password
        <input
          type="password"
          required
          minLength={6}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
        />
      </label>

      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-70">
        {loading ? "Updating..." : "Update Password"}
      </button>

      {status && <p className={`text-sm ${status.type === "success" ? "text-accent" : "text-red-300"}`}>{status.message}</p>}
    </form>
  );
}
