import ChangePasswordForm from "@/components/admin/ChangePasswordForm";
import { getAdminUser } from "@/lib/auth";

export default async function AdminSettingsPage() {
  const user = await getAdminUser();

  return (
    <div>
      <p className="section-label">Admin / Settings</p>
      <h1 className="mt-2 font-display text-3xl text-text-primary">Account Settings</h1>
      <p className="mt-2 text-text-secondary">Signed in as {user.email}. Update your admin login password below.</p>
      <div className="mt-6 max-w-md">
        <ChangePasswordForm email={user.email} />
      </div>
    </div>
  );
}
