"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePasswordLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setMessage(error.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`
      });

      if (error) {
        throw error;
      }

      setMessage("Password reset link sent. Check your inbox.");
    } catch (error) {
      setMessage(error.message || "Unable to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  if (mode === "forgot") {
    return (
      <main className="page-shell py-20">
        <div className="mx-auto w-full max-w-md panel p-8">
          <p className="section-label">Admin / Access</p>
          <h1 className="mt-2 font-display text-3xl text-text-primary">Reset Your Password</h1>
          <p className="mt-2 text-sm text-text-secondary">Enter your admin email and we&apos;ll send you a reset link.</p>

          <form onSubmit={handleForgotPassword} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-text-secondary">
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
              />
            </label>

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-70">
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            {message ? <p className="text-sm text-text-secondary">{message}</p> : null}

            <button
              type="button"
              onClick={() => {
                setMode("password");
                setMessage("");
              }}
              className="w-full text-center text-sm text-text-secondary hover:text-text-primary"
            >
              ← Back to Sign In
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell py-20">
      <div className="mx-auto w-full max-w-md panel p-8">
        <p className="section-label">Admin / Access</p>
        <h1 className="mt-2 font-display text-3xl text-text-primary">Sign in to Dashboard</h1>

        <form onSubmit={handlePasswordLogin} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-text-secondary">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
            />
          </label>

          <label className="block text-sm font-medium text-text-secondary">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-accent"
            />
          </label>

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-70">
            {loading ? "Please wait..." : "Sign In"}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("forgot");
              setMessage("");
            }}
            className="w-full text-center text-sm text-text-secondary hover:text-text-primary"
          >
            Forgot your password?
          </button>

          {message ? <p className="text-sm text-text-secondary">{message}</p> : null}
        </form>
      </div>
    </main>
  );
}
