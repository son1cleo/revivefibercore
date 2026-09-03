"use client";

import AdminManagedTable from "@/components/admin/AdminManagedTable";

const columns = [
  {
    key: "year",
    label: "Year",
    render: (item) => <span className="font-medium text-text-primary">{item.year}</span>
  },
  {
    key: "water_saved_liters",
    label: "Water Saved",
    render: (item) => <span className="text-text-secondary">{Number(item.water_saved_liters || 0).toLocaleString()} L</span>
  },
  {
    key: "carbon_saved_kg",
    label: "Carbon Saved",
    render: (item) => <span className="text-text-secondary">{Number(item.carbon_saved_kg || 0).toLocaleString()} kg CO2e</span>
  }
];

export default function ImpactStatList({ items }) {
  return (
    <AdminManagedTable
      items={items}
      columns={columns}
      entityLabel="year"
      editBasePath="/admin/impact"
      deleteBasePath="/api/admin/impact"
      searchKeys={["year"]}
    />
  );
}
