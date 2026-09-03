import Link from "next/link";
import { Images, MessageSquare, Package, Palette, Users } from "lucide-react";
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

const PRODUCT_CATEGORY_LABELS = [
  { key: "Machine In Production", label: "Machine In Production" },
  { key: "Packing & Export", label: "Packing & Export" },
  { key: "Wiping Rags", label: "Wiping Rags" },
  { key: "Sustainable Product Sampling", label: "Sustainable Sampling" }
];

function timeAgo(dateString) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  return `${Math.floor(days / 30)}mo ago`;
}

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

  const categoryBreakdown = PRODUCT_CATEGORY_LABELS.map((entry) => ({
    ...entry,
    count: productItems.filter((item) => item.category === entry.key).length
  }));
  const maxCategoryCount = Math.max(1, ...categoryBreakdown.map((entry) => entry.count));

  const recentMessages = messages.slice(0, 4);

  const secondaryStats = [
    { label: "Colors", value: colorsCount, href: "/admin/colors", cta: "Manage colors", icon: Palette },
    { label: "Portfolio Work Items", value: workCount, href: "/admin/work", cta: "Manage work", icon: Images },
    { label: "Client Profiles", value: clientsCount, href: "/admin/clients", cta: "Manage clients", icon: Users },
    { label: "Unread Messages", value: unreadCount, href: "/admin/messages", cta: "View messages", icon: MessageSquare }
  ];

  return (
    <main className="page-shell py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="section-label">Admin / Dashboard</p>
          <h1 className="mt-2 font-display text-4xl text-text-primary">Dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm text-text-secondary">
            Manage products, colors, portfolio work, clients, and messages.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <div className="panel flex flex-col justify-between p-8 sm:col-span-2 lg:col-span-2 lg:row-span-2">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-bg text-accent">
                <Package className="h-5 w-5" />
              </span>
              <span className="section-label">Product Photos</span>
            </div>
            <div className="mt-8">
              <p className="text-6xl font-semibold text-text-primary">{productsCount}</p>
              <p className="mt-2 text-sm text-text-secondary">
                Across Recycled Fibers and Wiping Rags galleries.
              </p>
            </div>
            <Link className="mt-8 inline-block text-sm font-medium text-accent hover:text-accent-h" href="/admin/products">
              Manage products →
            </Link>
          </div>

          {secondaryStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="panel flex flex-col justify-between p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-bg text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="mt-4">
                  <p className="text-sm text-text-secondary">{stat.label}</p>
                  <p className="mt-1 text-3xl font-semibold text-text-primary">{stat.value}</p>
                </div>
                <Link className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-h" href={stat.href}>
                  {stat.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="panel p-6">
            <p className="font-display text-lg text-text-primary">Products by Category</p>
            <p className="mt-1 text-sm text-text-secondary">How the product catalog breaks down right now.</p>

            <div className="mt-6 space-y-4">
              {categoryBreakdown.map((entry) => (
                <div key={entry.key}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">{entry.label}</span>
                    <span className="font-medium text-text-primary">{entry.count}</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${(entry.count / maxCategoryCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <div className="flex items-center justify-between">
              <p className="font-display text-lg text-text-primary">Recent Messages</p>
              <Link href="/admin/messages" className="text-xs font-medium text-accent hover:text-accent-h">
                View all
              </Link>
            </div>

            {recentMessages.length === 0 ? (
              <p className="mt-6 text-sm text-text-secondary">No messages yet.</p>
            ) : (
              <ul className="mt-5 space-y-4">
                {recentMessages.map((message) => (
                  <li key={message.id} className="flex items-start gap-3">
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${message.read ? "bg-border" : "bg-accent"}`}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-text-primary">{message.name}</p>
                      <p className="truncate text-xs text-text-secondary">{message.subject || "No subject"}</p>
                      <p className="mt-0.5 text-[0.7rem] uppercase tracking-wide text-text-muted">
                        {timeAgo(message.created_at)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
