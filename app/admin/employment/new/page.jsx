import EmploymentEditor from "@/components/admin/EmploymentEditor";

export default function AdminNewEmploymentPage() {
  return (
    <div>
      <p className="section-label">Admin / Employment</p>
      <h1 className="mt-2 font-display text-3xl text-text-primary">Create Application</h1>
      <p className="mt-2 text-text-secondary">Add an employment application entry with resume and review status.</p>
      <div className="mt-6">
        <EmploymentEditor />
      </div>
    </div>
  );
}
