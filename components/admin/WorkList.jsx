"use client";

import { useMemo } from "react";
import AdminManagedTable from "@/components/admin/AdminManagedTable";

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
    render: (item) => <span className="text-text-secondary">{item.category || "General"}</span>
  },
  {
    key: "media_type",
    label: "Media Type",
    render: (item) => <span className="capitalize text-text-secondary">{item.media_type}</span>
  }
];

export default function WorkList({ items }) {
  const categoryOptions = useMemo(() => {
    const values = Array.from(new Set(items.map((item) => item.category).filter(Boolean)));
    return values.map((value) => ({ value, label: value }));
  }, [items]);

  const mediaTypeOptions = [
    { value: "image", label: "Image" },
    { value: "video", label: "Video" }
  ];

  return (
    <AdminManagedTable
      items={items}
      columns={columns}
      entityLabel="work item"
      editBasePath="/admin/work"
      deleteBasePath="/api/admin/work"
      searchKeys={["title", "description"]}
      filters={[
        { key: "category", label: "All Categories", options: categoryOptions, getValue: (item) => item.category },
        { key: "media_type", label: "All Media Types", options: mediaTypeOptions, getValue: (item) => item.media_type }
      ]}
    />
  );
}
