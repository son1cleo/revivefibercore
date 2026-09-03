"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAdminSearch } from "@/components/admin/AdminSearchContext";

const PAGE_SIZE = 8;

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function isSameDay(value, dateInputValue) {
  if (!value || !dateInputValue) return true;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const local = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return local === dateInputValue;
}

export default function AdminManagedTable({
  items,
  columns,
  entityLabel,
  editBasePath,
  deleteBasePath,
  dateKey = "created_at",
  statusKey = "published",
  searchKeys = [],
  filters = []
}) {
  const router = useRouter();
  const { query } = useAdminSearch();
  const [tab, setTab] = useState("all");
  const [draftFilterValues, setDraftFilterValues] = useState(() => Object.fromEntries(filters.map((f) => [f.key, ""])));
  const [draftDate, setDraftDate] = useState("");
  const [appliedFilterValues, setAppliedFilterValues] = useState(() => Object.fromEntries(filters.map((f) => [f.key, ""])));
  const [appliedDate, setAppliedDate] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const filtered = useMemo(() => {
    let rows = items;

    if (statusKey) {
      if (tab === "published") rows = rows.filter((row) => Boolean(row[statusKey]));
      if (tab === "drafts") rows = rows.filter((row) => !row[statusKey]);
    }

    filters.forEach((filter) => {
      const value = appliedFilterValues[filter.key];
      if (value) {
        rows = rows.filter((row) => filter.getValue(row) === value);
      }
    });

    if (appliedDate) {
      rows = rows.filter((row) => isSameDay(row[dateKey], appliedDate));
    }

    if (query.trim()) {
      const needle = query.trim().toLowerCase();
      rows = rows.filter((row) => searchKeys.some((key) => String(row[key] || "").toLowerCase().includes(needle)));
    }

    return rows;
  }, [items, tab, appliedFilterValues, appliedDate, query, statusKey, filters, searchKeys, dateKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const applyFilters = (event) => {
    event.preventDefault();
    setAppliedFilterValues(draftFilterValues);
    setAppliedDate(draftDate);
    setPage(1);
  };

  const changeTab = (value) => {
    setTab(value);
    setPage(1);
    setSelected([]);
  };

  const toggleSelectAll = (event) => {
    setSelected(event.target.checked ? pageRows.map((row) => row.id) : []);
  };

  const toggleSelectOne = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]));
  };

  const deleteOne = async (id) => {
    const confirmed = window.confirm(`Delete this ${entityLabel}?`);
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const response = await fetch(`${deleteBasePath}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error();
      setSelected((prev) => prev.filter((value) => value !== id));
      router.refresh();
    } catch {
      window.alert(`Unable to delete this ${entityLabel}.`);
    } finally {
      setDeletingId(null);
    }
  };

  const deleteSelected = async () => {
    const confirmed = window.confirm(`Delete ${selected.length} selected ${entityLabel}${selected.length === 1 ? "" : "s"}?`);
    if (!confirmed) return;

    setBulkDeleting(true);
    try {
      await Promise.all(selected.map((id) => fetch(`${deleteBasePath}/${id}`, { method: "DELETE" })));
      setSelected([]);
      router.refresh();
    } catch {
      window.alert(`Unable to delete the selected ${entityLabel}s.`);
    } finally {
      setBulkDeleting(false);
    }
  };

  const tabs = statusKey
    ? [
        { key: "all", label: "All", count: items.length },
        { key: "published", label: "Published", count: items.filter((row) => Boolean(row[statusKey])).length },
        { key: "drafts", label: "Drafts", count: items.filter((row) => !row[statusKey]).length }
      ]
    : null;

  return (
    <div>
      {tabs ? (
        <div className="flex items-center gap-5 border-b border-border text-sm">
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => changeTab(item.key)}
              className={`-mb-px flex items-center gap-1.5 border-b-2 px-1 py-3 font-medium transition-colors ${
                tab === item.key ? "border-accent text-accent" : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              {item.label}
              <span className="text-xs text-text-muted">({item.count})</span>
            </button>
          ))}
        </div>
      ) : null}

      {filters.length > 0 || dateKey ? (
        <form onSubmit={applyFilters} className="mt-4 flex flex-wrap items-center gap-3">
          {dateKey ? (
            <input
              type="date"
              value={draftDate}
              onChange={(event) => setDraftDate(event.target.value)}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
            />
          ) : null}

          {filters.map((filter) => (
            <select
              key={filter.key}
              value={draftFilterValues[filter.key]}
              onChange={(event) => setDraftFilterValues((prev) => ({ ...prev, [filter.key]: event.target.value }))}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
            >
              <option value="">{filter.label}</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ))}

          <button type="submit" className="btn-primary px-5 py-2 text-sm">
            Filter
          </button>
        </form>
      ) : null}

      <p className="mt-4 text-xs uppercase tracking-wide text-text-muted">
        {filtered.length} {entityLabel}
        {filtered.length === 1 ? "" : "s"}
      </p>

      {selected.length > 0 ? (
        <div className="mt-3 flex items-center justify-between rounded-lg bg-accent-bg px-4 py-2.5 text-sm text-text-primary">
          <span>{selected.length} selected</span>
          <button
            type="button"
            onClick={deleteSelected}
            disabled={bulkDeleting}
            className="font-medium text-red-500 hover:text-red-600 disabled:opacity-60"
          >
            {bulkDeleting ? "Deleting..." : "Delete Selected"}
          </button>
        </div>
      ) : null}

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-muted">
              <th className="w-8 py-2.5">
                <input
                  type="checkbox"
                  checked={pageRows.length > 0 && selected.length === pageRows.length}
                  onChange={toggleSelectAll}
                  aria-label="Select all rows on this page"
                />
              </th>
              {columns.map((column) => (
                <th key={column.key} className="py-2.5 pr-4 font-medium">
                  {column.label}
                </th>
              ))}
              {dateKey ? <th className="py-2.5 pr-4 font-medium">Date</th> : null}
              {statusKey ? <th className="py-2.5 pr-4 font-medium">Status</th> : null}
              <th className="py-2.5 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr key={row.id} className="border-b border-border/60 align-top hover:bg-surface-2/60">
                <td className="py-3.5">
                  <input
                    type="checkbox"
                    checked={selected.includes(row.id)}
                    onChange={() => toggleSelectOne(row.id)}
                    aria-label="Select row"
                  />
                </td>
                {columns.map((column) => (
                  <td key={column.key} className="py-3.5 pr-4">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                {dateKey ? <td className="py-3.5 pr-4 text-text-secondary">{formatDate(row[dateKey])}</td> : null}
                {statusKey ? (
                  <td className="py-3.5 pr-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs ${
                        row[statusKey] ? "bg-accent/15 text-accent" : "bg-surface-2 text-text-secondary"
                      }`}
                    >
                      {row[statusKey] ? "Published" : "Draft"}
                    </span>
                  </td>
                ) : null}
                <td className="py-3.5 text-right whitespace-nowrap">
                  <Link href={`${editBasePath}/${row.id}`} className="font-medium text-text-secondary hover:text-text-primary">
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteOne(row.id)}
                    disabled={deletingId === row.id}
                    className="ml-4 font-medium text-red-500 hover:text-red-600 disabled:opacity-60"
                  >
                    {deletingId === row.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}

            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 3} className="py-8 text-center text-sm text-text-secondary">
                  No {entityLabel}s found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-border p-1.5 text-text-secondary hover:bg-surface-2 disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setPage(pageNumber)}
              className={`h-8 w-8 rounded-lg text-sm font-medium ${
                pageNumber === currentPage ? "bg-accent text-surface" : "text-text-secondary hover:bg-surface-2"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-border p-1.5 text-text-secondary hover:bg-surface-2 disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
