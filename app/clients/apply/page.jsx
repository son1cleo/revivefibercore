import ClientForm from "@/components/ClientForm";

export const metadata = {
  title: "Partner With Us - Revive Fiber Co",
  description: "Become a Revive Fiber Co partner. Tell us about your business.",
};

export default function ClientApplicationPage() {
  return (
    <main className="page-shell py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12">
          <h1 className="font-display text-4xl text-text-primary">Partner With Us</h1>
          <p className="mt-4 text-text-secondary">
            We're looking for like-minded businesses to collaborate with. Share your details below and we'll connect with you soon.
          </p>
        </div>
        <ClientForm />
      </div>
    </main>
  );
}
