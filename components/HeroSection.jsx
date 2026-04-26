"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden px-5 pb-20 pt-24 md:pt-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-mint via-cream to-sage/30" />
      <div className="absolute -left-20 top-16 -z-10 h-72 w-72 rounded-full bg-sage/30 blur-3xl" />
      <div className="absolute -right-16 bottom-10 -z-10 h-80 w-80 animate-drift rounded-full bg-forest/15 blur-3xl" />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-full border border-forest/20 bg-white/70 px-4 py-1 text-xs uppercase tracking-[0.2em] text-forest"
        >
          Sustainable Manufacturing Partner
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl text-4xl font-bold leading-tight text-charcoal md:text-6xl"
        >
          Bringing Fiber Back to Life.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl text-base text-charcoal/80 md:text-lg"
        >
          We transform textile waste into premium recycled fiber through precision engineering, sustainable process design, and consistent quality control.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          <Link href="/work" className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition hover:bg-olive">
            Explore Our Work
          </Link>
          <Link href="/contact" className="rounded-full border border-forest/30 px-6 py-3 text-sm font-medium text-forest transition hover:bg-forest/5">
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
