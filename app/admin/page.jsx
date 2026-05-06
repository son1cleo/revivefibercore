import Link from "next/link";
import { getAllAdminBlogs, getAllAdminClients, getAllAdminEmploymentApplications, getAllAdminWorkItems } from "@/lib/cms";

export const metadata = {
  title: "Admin Dashboard | Revive Fiber Co"
};

export default async function AdminDashboardPage() {
  const [posts, workItems, employmentItems, clientItems] = await Promise.all([
    getAllAdminBlogs(),
    getAllAdminWorkItems(),
    getAllAdminEmploymentApplications(),
    getAllAdminClients()
  ]);
  const postsCount = posts.length;
  const workCount = workItems.length;
  const employmentCount = employmentItems.length;
  const clientsCount = clientItems.length;

  return (
    <main className="page-shell py-12">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Admin / Dashboard</p>
        <h1 className="mt-2 font-display text-4xl text-text-primary">Dashboard</h1>
        <p className="mt-2 text-sm text-text-secondary">Manage content across blogs and portfolio work.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="panel p-6">
            <p className="text-sm text-text-secondary">Published Blog Posts</p>
            <p className="mt-2 text-4xl font-semibold text-text-primary">{postsCount}</p>
            <Link className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-h" href="/admin/blogs">
              Manage posts
            </Link>
          </div>
          <div className="panel p-6">
            <p className="text-sm text-text-secondary">Portfolio Work Items</p>
            <p className="mt-2 text-4xl font-semibold text-text-primary">{workCount}</p>
            <Link className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-h" href="/admin/work">
              Manage work
            </Link>
          </div>
          <div className="panel p-6">
            <p className="text-sm text-text-secondary">Employment Applications</p>
            <p className="mt-2 text-4xl font-semibold text-text-primary">{employmentCount}</p>
            <Link className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-h" href="/admin/employment">
              Manage applications
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
