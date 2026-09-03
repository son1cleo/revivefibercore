"use client";

import AdminManagedTable from "@/components/admin/AdminManagedTable";

const columns = [
  {
    key: "preview",
    label: "Color",
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="h-7 w-7 shrink-0 rounded-full border border-border/60" style={{ backgroundColor: item.hex }} />
        <div>
          <p className="font-medium text-text-primary">{item.name}</p>
          <p className="text-xs uppercase text-text-muted">{item.hex}</p>
        </div>
      </div>
    )
  },
  {
    key: "display_order",
    label: "Display Order",
    render: (item) => <span className="text-text-secondary">{item.display_order ?? "—"}</span>
  }
];

export default function ColorList({ items }) {
  return (
    <AdminManagedTable
      items={items}
      columns={columns}
      entityLabel="color"
      editBasePath="/admin/colors"
      deleteBasePath="/api/admin/colors"
      searchKeys={["name", "hex"]}
    />
  );
}
