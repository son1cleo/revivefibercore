import ColorEditor from "@/components/admin/ColorEditor";

export default function AdminNewColorPage() {
  return (
    <div>
      <p className="section-label">Admin / Colors</p>
      <h1 className="mt-2 font-display text-3xl text-text-primary">Add Color</h1>
      <p className="mt-2 text-text-secondary">Add a new shoddy color to the Our Products page.</p>
      <div className="mt-6">
        <ColorEditor />
      </div>
    </div>
  );
}
