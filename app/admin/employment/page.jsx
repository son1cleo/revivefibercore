import Link from "next/link";
import EmploymentList from "@/components/admin/EmploymentList";
import { getAllAdminEmploymentApplications } from "@/lib/cms";

export default async function AdminEmploymentPage() {
  const items = await getAllAdminEmploymentApplications();

  return (
    <main className="page-shell py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-label">Admin / Employment</p>
            <h1 className="mt-2 font-display text-4xl text-text-primary">Employment Applications</h1>
            <p className="mt-2 text-sm text-text-secondary">Track applicants, resumes, and hiring status.</p>
          </div>
          <Link href="/admin/employment/new" className="btn-primary">
            New Application
          </Link>
        </div>

        <div className="mt-8">
          <EmploymentList items={items} />
        </div>
      </div>
    </main>
  );
}
