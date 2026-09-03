"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Settings, X } from "lucide-react";

const titles = {
  "/admin": "Dashboard",
  "/admin/products": "Products",
  "/admin/colors": "Colors",
  "/admin/work": "Work Items",
  "/admin/clients": "Clients",
  "/admin/messages": "Messages",
  "/admin/settings": "Settings"
};

function resolveTitle(pathname) {
  if (titles[pathname]) {
    return titles[pathname];
  }

  const base = `/${pathname.split("/").slice(1, 3).join("/")}`;
  return titles[base] || "Admin";
}

export default function AdminTopbar({ open, onToggle }) {
  const pathname = usePathname();

  return (
    <div className="dark mb-4 flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3 md:hidden">
      <button type="button" onClick={onToggle} aria-label="Toggle menu" className="text-text-primary">
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      <p className="font-display text-base text-text-primary">{resolveTitle(pathname)}</p>
      <Link href="/admin/settings" aria-label="Settings" className="text-text-secondary hover:text-text-primary">
        <Settings className="h-5 w-5" />
      </Link>
    </div>
  );
}
