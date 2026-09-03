"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Droplets, Images, LayoutDashboard, MessageSquare, Package, Palette, Settings, Users } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/colors", label: "Colors", icon: Palette },
  { href: "/admin/work", label: "Work Items", icon: Images },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/impact", label: "Impact Stats", icon: Droplets },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare }
];

export default function AdminSidebar({ open = false, onNavigate }) {
  const pathname = usePathname();

  return (
    <aside
      className={`dark fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col justify-between overflow-y-auto border-r border-border bg-surface p-6 text-text-primary transition-transform duration-300 md:translate-x-0 ${
        open ? "max-md:translate-x-0" : "max-md:-translate-x-full"
      }`}
    >
      <div>
        <div className="flex items-center gap-3 px-1">
          <BrandLogo className="h-9" showWordmark={false} />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-text-primary">Revive Fiber</p>
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-text-muted">Admin Panel</p>
          </div>
        </div>

        <p className="mt-8 px-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-text-muted">Main</p>

        <nav className="mt-3 space-y-1.5 text-sm">
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`mx-0.5 flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 font-medium transition-colors ${
                  active
                    ? "bg-accent text-surface shadow-[0_2px_8px_-2px_rgba(0,0,0,0.35)]"
                    : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                }`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                  <Icon className="h-4 w-4" />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 space-y-3 border-t border-border pt-5">
        <Link
          href="/admin/settings"
          onClick={onNavigate}
          className={`mx-0.5 flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
            pathname.startsWith("/admin/settings")
              ? "bg-accent text-surface shadow-[0_2px_8px_-2px_rgba(0,0,0,0.35)]"
              : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
          }`}
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            <Settings className="h-4 w-4" />
          </span>
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
