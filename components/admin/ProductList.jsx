"use client";

import AdminManagedTable from "@/components/admin/AdminManagedTable";

const categoryLabels = {
  "Machine In Production": "Recycled Fibers · Machine In Production",
  "Packing & Export": "Recycled Fibers · Packing & Export",
  "Wiping Rags": "Wiping Rags",
  "Sustainable Product Sampling": "Sustainable Sampling"
};

const categoryOptions = Object.entries(categoryLabels).map(([value, label]) => ({ value, label }));

const columns = [
  {
    key: "title",
    label: "Title",
    render: (item) => (
      <div>
        <p className="font-medium text-text-primary">{item.title}</p>
        {item.description ? <p className="mt-0.5 max-w-xs truncate text-xs text-text-secondary">{item.description}</p> : null}
      </div>
    )
  },
  {
    key: "category",
    label: "Category",
    render: (item) => <span className="text-text-secondary">{categoryLabels[item.category] || item.category}</span>
  }
];

export default function ProductList({ items }) {
  return (
    <AdminManagedTable
      items={items}
      columns={columns}
      entityLabel="product"
      editBasePath="/admin/products"
      deleteBasePath="/api/admin/work"
      searchKeys={["title", "description"]}
      filters={[{ key: "category", label: "All Categories", options: categoryOptions, getValue: (item) => item.category }]}
    />
  );
}
