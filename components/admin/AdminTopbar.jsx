"use client";

import { Menu, Search, X } from "lucide-react";
import { useAdminSearch } from "@/components/admin/AdminSearchContext";

function getInitials(email) {
  if (!email) return "AD";
  const local = email.split("@")[0];
  return local.slice(0, 2).toUpperCase();
}

export default function AdminTopbar({ email, open, onToggle }) {
  const { query, setQuery } = useAdminSearch();

  return (
    <div className="dark mb-4 flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3">
      <button type="button" onClick={onToggle} aria-label="Toggle menu" className="shrink-0 text-text-primary md:hidden">
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search this list..."
          className="w-full rounded-xl border border-border bg-surface-2 py-2 pl-9 pr-3 text-sm text-text-primary outline-none transition focus:border-accent"
        />
      </div>

      <div className="hidden shrink-0 items-center gap-2.5 sm:flex">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-surface">
          {getInitials(email)}
        </span>
        <div className="leading-tight">
          <p className="text-sm font-medium text-text-primary">Welcome, Sajidur Rahman Siddiky</p>
          <p className="text-xs text-text-muted">{email}</p>
        </div>
      </div>
    </div>
  );
}
