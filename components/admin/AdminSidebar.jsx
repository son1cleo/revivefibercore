"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Images, LayoutDashboard, MessageSquare, Package, Users } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/work", label: "Work Items", icon: Images },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare }
];

export default function AdminSidebar({ email }) {
  const pathname = usePathname();

  return (
    <aside className="dark flex h-full flex-col justify-between rounded-[20px] border border-border bg-surface p-5 text-text-primary md:sticky md:top-4 md:self-start">
      <div>
        <div className="flex items-center gap-2.5">
          <BrandLogo className="h-9" showWordmark={false} />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-text-primary">Revive Fiber</p>
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-text-muted">Admin Panel</p>
          </div>
        </div>

        <p className="mt-4 truncate rounded-lg bg-surface-2 px-3 py-2 text-xs text-text-secondary">{email}</p>

        <nav className="mt-6 space-y-1 text-sm">
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors ${
                  active ? "bg-accent text-surface" : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 space-y-3">
        <Link href="/" className="block text-center text-xs text-text-muted hover:text-text-secondary">
          ← Back to site
        </Link>
        <AdminLogoutButton />
      </div>
    </aside>
  );
}
