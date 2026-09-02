import ContactForm from "@/components/ContactForm";
import { contactInfo } from "@/lib/content";

export const metadata = {
  title: "Contact With Us | Revive Fiber Co",
  description: "Get in touch with Revive Fiber Co for recycled fiber orders, samples, and partnership inquiries."
};

export default function ContactWithUsPage() {
  return (
    <main className="page-shell grid gap-6 py-16 md:grid-cols-2">
      <section className="panel p-8 md:p-10">
        <p className="section-label">Contact With Us</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,4vw,4rem)] leading-[1.1] text-text-primary">
          Let&apos;s Talk About Your Fiber Goals
        </h1>
        <p className="mt-4 text-text-secondary">
          Share your requirements and our team will respond with a tailored recycling and fiber processing plan.
        </p>

        <div className="mt-8 space-y-4 text-sm text-text-secondary">
          <p>
            Email:{" "}
            <a href={`mailto:${contactInfo.email}`} className="hover:text-accent">
              {contactInfo.email}
            </a>
          </p>
          <p>
            WhatsApp:{" "}
            <a href={`https://wa.me/${contactInfo.whatsapp.replace("+", "")}`} className="hover:text-accent">
              {contactInfo.whatsapp}
            </a>
          </p>
          <div>
            <p className="font-semibold text-text-primary">Corporate Office</p>
            <p>{contactInfo.corporateOffice}</p>
          </div>
          <div>
            <p className="font-semibold text-text-primary">Factory Address</p>
            <p>{contactInfo.factoryAddress}</p>
          </div>
        </div>
      </section>

      <div className="panel p-6 md:p-8">
        <ContactForm />
      </div>
    </main>
  );
}
