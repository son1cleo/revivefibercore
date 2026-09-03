import ImpactStatEditor from "@/components/admin/ImpactStatEditor";

export default function AdminNewImpactStatPage() {
  return (
    <div>
      <p className="section-label">Admin / Impact Stats</p>
      <h1 className="mt-2 font-display text-3xl text-text-primary">Add Year</h1>
      <p className="mt-2 text-text-secondary">Add water and carbon savings figures for a year.</p>
      <div className="mt-6">
        <ImpactStatEditor />
      </div>
    </div>
  );
}
