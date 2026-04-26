"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    setLoading(true);

    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={loading}
      className="w-full rounded-full border border-border px-4 py-2 text-sm font-semibold text-text-secondary hover:bg-surface-2 hover:text-text-primary disabled:opacity-70"
    >
      {loading ? "Logging out..." : "Log Out"}
    </button>
  );
}
