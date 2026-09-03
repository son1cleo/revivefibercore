"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminShell({ email, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="grid gap-6 md:grid-cols-[250px_1fr] md:items-start">
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <AdminSidebar email={email} open={open} onNavigate={() => setOpen(false)} />

      <div className="min-w-0">
        <AdminTopbar open={open} onToggle={() => setOpen((value) => !value)} />
        <section className="panel p-7 md:p-8">{children}</section>
      </div>
    </div>
  );
}
