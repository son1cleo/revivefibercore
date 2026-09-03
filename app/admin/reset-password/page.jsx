"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        throw error;
      }

      setSuccess(true);
      setMessage("Password updated. Redirecting to sign in...");
      setTimeout(() => router.push("/admin/login"), 1500);
    } catch (error) {
      setMessage(error.message || "Unable to reset password. The link may have expired — request a new one.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell py-20">
      <div className="mx-auto w-full max-w-md panel p-8">
        <p className="section-label">Admin / Reset Password</p>
        <h1 className="mt-2 font-display text-3xl text-text-primary">Set a New Password</h1>
        <p className="mt-2 text-sm text-text-secondary">Enter a new password for your admin account.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-text-secondary">
            New Password
            <input
              type="password"
              required
              minLength={6}
              disabled={success}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent disabled:opacity-60"
            />
          </label>

          <label className="block text-sm font-medium text-text-secondary">
            Confirm New Password
            <input
              type="password"
              required
              minLength={6}
              disabled={success}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent disabled:opacity-60"
            />
          </label>

          <button type="submit" disabled={loading || success} className="btn-primary w-full disabled:opacity-70">
            {loading ? "Updating..." : "Update Password"}
          </button>

          {message ? (
            <p className={`text-sm ${success ? "text-accent" : "text-red-300"}`}>{message}</p>
          ) : null}
        </form>
      </div>
    </main>
  );
}
