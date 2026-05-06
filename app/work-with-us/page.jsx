import WorkWithUsOptions from "@/components/WorkWithUsOptions";

export const metadata = {
  title: "Work With Us | Revive Fiber Co",
  description: "Choose between careers and partnerships to connect with Revive Fiber Co."
};

export default function WorkWithUsPage() {
  return (
    <main className="page-shell py-16">
      <section className="panel p-8 md:p-12">
        <p className="section-label">Work With Us</p>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.08] text-text-primary">
          Choose the path that fits you best.
        </h1>
        <p className="mt-5 max-w-2xl text-text-secondary">
          Whether you want to join the team or explore a business partnership, start here and we’ll route you to the right form.
        </p>

        <WorkWithUsOptions />
      </section>
    </main>
  );
}