"use client";

import AdminManagedTable from "@/components/admin/AdminManagedTable";

const columns = [
  {
    key: "name",
    label: "Name",
    render: (item) => (
      <div>
        <p className="font-medium text-text-primary">{item.name}</p>
        {item.company ? <p className="mt-0.5 text-xs text-text-secondary">{item.company}</p> : null}
      </div>
    )
  },
  {
    key: "email",
    label: "Email",
    render: (item) => <span className="text-text-secondary">{item.email || "—"}</span>
  }
];

export default function ClientList({ items }) {
  return (
    <AdminManagedTable
      items={items}
      columns={columns}
      entityLabel="client"
      editBasePath="/admin/clients"
      deleteBasePath="/api/admin/clients"
      searchKeys={["name", "company", "email"]}
    />
  );
}
