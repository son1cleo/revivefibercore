import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import BrandLogo from "@/components/BrandLogo";

export default async function AdminLayout({ children }) {
  const user = await getAdminUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="page-shell grid gap-6 py-4 md:grid-cols-[230px_1fr]">
      <aside className="panel p-5">
        <p className="section-label">Admin</p>
        <div className="mt-2">
          <BrandLogo className="h-10" />
        </div>
        <p className="mt-1 text-xs text-text-secondary">{user.email}</p>

        <nav className="mt-6 space-y-2 text-sm">
          <Link href="/admin" className="block rounded-lg px-3 py-2 text-text-secondary hover:bg-surface-2 hover:text-text-primary">
            Dashboard
          </Link>
          <Link href="/admin/blogs" className="block rounded-lg px-3 py-2 text-text-secondary hover:bg-surface-2 hover:text-text-primary">
            Blogs
          </Link>
          <Link href="/admin/work" className="block rounded-lg px-3 py-2 text-text-secondary hover:bg-surface-2 hover:text-text-primary">
            Work Items
          </Link>
          <Link href="/admin/employment" className="block rounded-lg px-3 py-2 text-text-secondary hover:bg-surface-2 hover:text-text-primary">
            Employment
          </Link>
          <Link href="/admin/clients" className="block rounded-lg px-3 py-2 text-text-secondary hover:bg-surface-2 hover:text-text-primary">
            Clients
          </Link>
        </nav>

        <div className="mt-8">
          <AdminLogoutButton />
        </div>
      </aside>

      <section className="panel p-7 md:p-8">{children}</section>
    </div>
  );
}
