import ClientEditor from "@/components/admin/ClientEditor";

export default function AdminNewClientPage() {
  return (
    <div>
      <p className="section-label">Admin / Clients</p>
      <h1 className="mt-2 font-display text-3xl text-text-primary">Create Client</h1>
      <p className="mt-2 text-text-secondary">Add a new client record and optionally publish it.</p>
      <div className="mt-6">
        <ClientEditor />
      </div>
    </div>
  );
}
