import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Our Products | Revive Fiber Co",
  description: "Explore Revive Fiber Co's products and contact options."
};

export default function ContactPage() {
  return (
    <div className="page-shell grid gap-6 py-16 md:grid-cols-2">
      <section className="panel p-8 md:p-10">
        <p className="section-label">03 - Our Products</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,4vw,4rem)] leading-[1.1] text-text-primary">Let&apos;s Talk About Your Fiber Goals</h1>
        <p className="mt-4 text-text-secondary">
          Share your requirements and our team will respond with a tailored recycling and fiber processing plan.
        </p>

        <div className="mt-8 space-y-2 text-sm text-text-secondary">
          <p>Email: hello@revivefiberco.com</p>
          <p>Phone: +880 1700 000000</p>
          <p>Location: Dhaka, Bangladesh</p>
        </div>
      </section>

      <div className="panel p-6 md:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
