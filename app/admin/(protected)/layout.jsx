import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminIdleLogout from "@/components/admin/AdminIdleLogout";

export default async function AdminLayout({ children }) {
  const user = await getAdminUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="page-shell grid gap-6 py-4 md:grid-cols-[250px_1fr] md:items-start">
      <AdminIdleLogout />
      <AdminSidebar email={user.email} />
      <section className="panel p-7 md:p-8">{children}</section>
    </div>
  );
}
