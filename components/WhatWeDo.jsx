"use client";

import { BadgeDollarSign, Cog, HeartHandshake, ShieldCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const iconMap = { ShieldCheck, Cog, BadgeDollarSign, Truck, HeartHandshake };

export default function WhatWeDo({ items }) {
  return (
    <AnimatedSection className="page-shell py-14">
      <p className="section-label">02 - Why Choose Us</p>
      <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.12] text-text-primary">Why Choose Revive Fiber Co.?</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon] || ShieldCheck;

          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="panel-muted p-6 transition-all duration-300 hover:border-accent hover:bg-accent-bg"
            >
              <Icon className="h-7 w-7 text-accent" />
              <h3 className="mt-4 text-lg font-semibold text-text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{item.description}</p>
            </motion.article>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
