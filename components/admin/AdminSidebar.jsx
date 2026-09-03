"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Images, LayoutDashboard, MessageSquare, Package, Palette, Settings, Users } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/colors", label: "Colors", icon: Palette },
  { href: "/admin/work", label: "Work Items", icon: Images },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare }
];

export default function AdminSidebar({ email, open = false, onNavigate }) {
  const pathname = usePathname();

  return (
    <aside
      className={`dark fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col justify-between overflow-y-auto border-r border-border bg-surface p-5 text-text-primary transition-transform duration-300 md:sticky md:top-4 md:z-auto md:h-auto md:w-auto md:!translate-x-0 md:self-start md:rounded-[20px] md:border ${
        open ? "max-md:translate-x-0" : "max-md:-translate-x-full"
      }`}
    >
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
                onClick={onNavigate}
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
        <Link
          href="/admin/settings"
          onClick={onNavigate}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            pathname.startsWith("/admin/settings")
              ? "bg-accent text-surface"
              : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
          }`}
        >
          <Settings className="h-4 w-4 shrink-0" />
          Settings
        </Link>
        <Link href="/" className="block text-center text-xs text-text-muted hover:text-text-secondary">
          ← Back to site
        </Link>
        <AdminLogoutButton />
      </div>
    </aside>
  );
}
