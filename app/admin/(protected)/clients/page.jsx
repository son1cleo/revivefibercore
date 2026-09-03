import Link from "next/link";
import { Plus } from "lucide-react";
import ClientList from "@/components/admin/ClientList";
import { getAllAdminClients } from "@/lib/cms";

export default async function AdminClientsPage() {
  const items = await getAllAdminClients();

  return (
    <main className="page-shell py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-label">Admin / Clients</p>
            <h1 className="mt-2 font-display text-4xl text-text-primary">Clients</h1>
            <p className="mt-2 text-sm text-text-secondary">Maintain client profiles and publication state.</p>
          </div>
          <Link href="/admin/clients/new" className="btn-primary inline-flex items-center gap-1.5">
            <Plus className="h-4 w-4" />
            New Client
          </Link>
        </div>

        <div className="mt-8">
          <ClientList items={items} />
        </div>
      </div>
    </main>
  );
}
