"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1800&q=80"
          alt="Fiber field and clean energy"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/55 via-bg/85 to-bg" />
      </div>

      <div className="page-shell relative z-10 flex min-h-[calc(100svh-80px)] flex-col justify-center py-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          00 - Home
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.03 }}
          className="mt-4 font-display text-2xl text-text-secondary sm:text-3xl"
        >
          Revive Fiber Co.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.07 }}
          className="mt-2 max-w-5xl font-display text-[clamp(2.4rem,6.5vw,6.4rem)] leading-[1.08] text-text-primary"
        >
          Premium Recycled Cotton Fiber for a{" "}
          <em className="font-display italic text-accent">Circular Future</em>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-xl text-base leading-relaxed text-text-secondary md:text-[1.08rem]">
            We transform textile waste into high-quality recycled cotton fiber for spinning, bedding, automotive, insulation, and other sustainable applications.
          </p>

          <div className="flex flex-wrap gap-3 z-20">
            <Link href="/work" className="btn-primary z-20">
              Explore Work
            </Link>
            <Link href="/contact" className="btn-ghost z-20">
              Our Products
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="ticker relative z-10">
        <div className="ticker-track animate-marquee">
          {new Array(2).fill(0).map((_, i) => (
            <span key={i} className="whitespace-nowrap">
              Sustainable · Recycled · Circular · Eco · Sustainable · Recycled · Circular · Eco
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
