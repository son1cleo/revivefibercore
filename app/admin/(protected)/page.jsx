import Link from "next/link";
import {
  getAllAdminClients,
  getAllAdminContactMessages,
  getAllAdminProductColors,
  getAllAdminProductItems,
  getAllAdminWorkItems
} from "@/lib/cms";

export const metadata = {
  title: "Admin Dashboard | Revive Fiber Co"
};

export default async function AdminDashboardPage() {
  const [workItems, clientItems, productItems, colorItems, messages] = await Promise.all([
    getAllAdminWorkItems(),
    getAllAdminClients(),
    getAllAdminProductItems(),
    getAllAdminProductColors(),
    getAllAdminContactMessages()
  ]);
  const workCount = workItems.length;
  const clientsCount = clientItems.length;
  const productsCount = productItems.length;
  const colorsCount = colorItems.length;
  const unreadCount = messages.filter((message) => !message.read).length;

  return (
    <main className="page-shell py-12">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Admin / Dashboard</p>
        <h1 className="mt-2 font-display text-4xl text-text-primary">Dashboard</h1>
        <p className="mt-2 text-sm text-text-secondary">Manage products, colors, portfolio work, clients, and messages.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div className="panel p-6">
            <p className="text-sm text-text-secondary">Product Photos</p>
            <p className="mt-2 text-4xl font-semibold text-text-primary">{productsCount}</p>
            <Link className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-h" href="/admin/products">
              Manage products
            </Link>
          </div>
          <div className="panel p-6">
            <p className="text-sm text-text-secondary">Colors</p>
            <p className="mt-2 text-4xl font-semibold text-text-primary">{colorsCount}</p>
            <Link className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-h" href="/admin/colors">
              Manage colors
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
            <p className="text-sm text-text-secondary">Client Profiles</p>
            <p className="mt-2 text-4xl font-semibold text-text-primary">{clientsCount}</p>
            <Link className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-h" href="/admin/clients">
              Manage clients
            </Link>
          </div>
          <div className="panel p-6">
            <p className="text-sm text-text-secondary">Unread Messages</p>
            <p className="mt-2 text-4xl font-semibold text-text-primary">{unreadCount}</p>
            <Link className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-h" href="/admin/messages">
              View messages
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
