"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const options = [
  {
    href: "/careers",
    title: "Careers",
    description: "Explore roles, submit your application, and join the team building Revive Fiber Co.",
    chip: "Team path"
  },
  {
    href: "/clients/apply",
    title: "Partnerships",
    description: "Tell us about your business and let’s explore a supply or collaboration opportunity.",
    chip: "Business path"
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function WorkWithUsOptions() {
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-2">
      {options.map((option, index) => (
        <motion.div key={option.href} custom={index * 0.12} initial="hidden" animate="visible" variants={fadeUp}>
          <Link
            href={option.href}
            className="group block h-full rounded-[1.5rem] border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg dark:bg-surface-2/80"
          >
            <div className="flex h-full flex-col justify-between gap-8">
              <div>
                <span className="inline-flex rounded-full border border-border bg-accent-bg px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-text-primary">
                  {option.chip}
                </span>
                <h2 className="mt-4 font-display text-3xl text-text-primary md:text-4xl">{option.title}</h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-text-secondary md:text-base">{option.description}</p>
              </div>

              <div className="flex items-center justify-between border-t border-border/70 pt-4">
                <span className="text-sm font-medium text-text-primary">Continue</span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg text-text-primary transition group-hover:border-accent group-hover:bg-accent-bg group-hover:text-accent">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}