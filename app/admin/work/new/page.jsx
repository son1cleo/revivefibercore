import WorkEditor from "@/components/admin/WorkEditor";

export default function AdminNewWorkPage() {
  return (
    <div>
      <p className="section-label">Admin / Work</p>
      <h1 className="mt-2 font-display text-3xl text-text-primary">Create Work Item</h1>
      <p className="mt-2 text-text-secondary">Add new project media and control its visibility.</p>
      <div className="mt-6">
        <WorkEditor />
      </div>
    </div>
  );
}
