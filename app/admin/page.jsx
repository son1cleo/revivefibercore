import Link from "next/link";
import { getAllAdminBlogs, getAllAdminWorkItems } from "@/lib/cms";

export const metadata = {
  title: "Admin Dashboard | Revive Fiber Core"
};

export default async function AdminDashboardPage() {
  const [posts, workItems] = await Promise.all([getAllAdminBlogs(), getAllAdminWorkItems()]);
  const postsCount = posts.length;
  const workCount = workItems.length;

  return (
    <main className="page-shell py-12">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Admin / Dashboard</p>
        <h1 className="mt-2 font-display text-4xl text-text-primary">Dashboard</h1>
        <p className="mt-2 text-sm text-text-secondary">Manage content across blogs and portfolio work.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
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

        </div>
      </div>
    </main>
  );
}
