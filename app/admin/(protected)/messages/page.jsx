import MessageList from "@/components/admin/MessageList";
import { getAllAdminContactMessages } from "@/lib/cms";

export default async function AdminMessagesPage() {
  const items = await getAllAdminContactMessages();

  return (
    <main className="page-shell py-12">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Admin / Messages</p>
        <h1 className="mt-2 font-display text-4xl text-text-primary">Messages</h1>
        <p className="mt-2 text-sm text-text-secondary">Contact form submissions from the website.</p>

        <div className="mt-8">
          <MessageList items={items} />
        </div>
      </div>
    </main>
  );
}
