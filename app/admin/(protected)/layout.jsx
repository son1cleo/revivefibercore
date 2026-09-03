import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";
import AdminIdleLogout from "@/components/admin/AdminIdleLogout";

export default async function AdminLayout({ children }) {
  const user = await getAdminUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="page-shell py-4">
      <AdminIdleLogout />
      <AdminShell email={user.email}>{children}</AdminShell>
    </div>
  );
}
