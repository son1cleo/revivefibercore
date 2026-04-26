"use client";

import { Factory, Leaf, Recycle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const iconMap = { Recycle, Factory, Leaf, Sparkles };

export default function WhatWeDo({ items }) {
  return (
    <AnimatedSection className="mx-auto w-full max-w-6xl px-5 py-14">
      <h2 className="text-3xl font-bold text-charcoal">What We Do</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon] || Leaf;

          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl border border-forest/10 bg-white p-6 shadow-soft"
            >
              <Icon className="h-7 w-7 text-forest" />
              <h3 className="mt-4 text-lg font-semibold text-charcoal">{item.title}</h3>
              <p className="mt-2 text-sm text-charcoal/80">{item.description}</p>
            </motion.article>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
