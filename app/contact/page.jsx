import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact | Revive Fiber Core",
  description: "Start a conversation with Revive Fiber Core for sustainable textile recycling solutions."
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-16 md:grid-cols-2">
      <section>
        <p className="text-xs uppercase tracking-[0.2em] text-olive">Contact</p>
        <h1 className="mt-3 text-4xl font-bold text-charcoal">Let’s build circular value together.</h1>
        <p className="mt-4 text-charcoal/80">
          Share your requirements and our team will respond with a tailored recycling and fiber processing plan.
        </p>

        <div className="mt-8 space-y-2 text-sm text-charcoal/80">
          <p>Email: hello@revivefibercore.com</p>
          <p>Phone: +880 1700 000000</p>
          <p>Location: Dhaka, Bangladesh</p>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
