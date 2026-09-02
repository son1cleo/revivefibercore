import Link from "next/link";
import { getAllAdminClients, getAllAdminWorkItems } from "@/lib/cms";

export const metadata = {
  title: "Admin Dashboard | Revive Fiber Co"
};

export default async function AdminDashboardPage() {
  const [workItems, clientItems] = await Promise.all([getAllAdminWorkItems(), getAllAdminClients()]);
  const workCount = workItems.length;
  const clientsCount = clientItems.length;

  return (
    <main className="page-shell py-12">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Admin / Dashboard</p>
        <h1 className="mt-2 font-display text-4xl text-text-primary">Dashboard</h1>
        <p className="mt-2 text-sm text-text-secondary">Manage portfolio work and client profiles.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="panel p-6">
            <p className="text-sm text-text-secondary">Portfolio Work Items</p>
            <p className="mt-2 text-4xl font-semibold text-text-primary">{workCount}</p>
            <Link className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-h" href="/admin/work">
              Manage work
            </Link>
          </div>
          <div className="panel p-6">
            <p className="text-sm text-text-secondary">Client Profiles</p>
            <p className="mt-2 text-4xl font-semibold text-text-primary">{clientsCount}</p>
            <Link className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-h" href="/admin/clients">
              Manage clients
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
