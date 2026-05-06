import EmploymentForm from "@/components/EmploymentForm";

export const metadata = {
  title: "Apply Now - Revive Fiber Co",
  description: "Join the Revive Fiber Co team. Submit your application and resume.",
};

export default function CareersPage() {
  return (
    <main className="page-shell py-16 pb-28">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12">
          <h1 className="font-display text-4xl text-text-primary">Career Opportunities</h1>
          <p className="mt-4 text-text-secondary">
            Interested in joining our team? Submit your application below. We review all submissions and will be in touch soon.
          </p>
        </div>
        <EmploymentForm />
      </div>
    </main>
  );
}
