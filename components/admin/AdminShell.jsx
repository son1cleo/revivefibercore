"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { AdminSearchProvider } from "@/components/admin/AdminSearchContext";

export default function AdminShell({ email, children }) {
  const [open, setOpen] = useState(false);

  return (
    <AdminSearchProvider>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <AdminSidebar open={open} onNavigate={() => setOpen(false)} />

      <div className="min-w-0 md:pl-72">
        <div className="page-shell py-4">
          <AdminTopbar email={email} open={open} onToggle={() => setOpen((value) => !value)} />
          <section className="panel p-7 md:p-8">{children}</section>
        </div>
      </div>
    </AdminSearchProvider>
  );
}
