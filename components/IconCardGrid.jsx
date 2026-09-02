"use client";

import { motion } from "framer-motion";
import {
  Box,
  ClipboardCheck,
  Cog,
  HeartHandshake,
  Layers,
  Leaf,
  Package,
  Palette,
  Recycle,
  Scissors,
  Shirt,
  ShieldCheck,
  Truck,
  Wind
} from "lucide-react";

const iconMap = {
  Box,
  ClipboardCheck,
  Cog,
  HeartHandshake,
  Layers,
  Leaf,
  Package,
  Palette,
  Recycle,
  Scissors,
  Shirt,
  ShieldCheck,
  Truck,
  Wind
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function IconCardGrid({ items, columns = "sm:grid-cols-2 md:grid-cols-3" }) {
  return (
    <div className={`mt-5 grid gap-4 ${columns}`}>
      {items.map((item, index) => {
        const Icon = iconMap[item.icon] || Leaf;

        return (
          <motion.article
            key={item.title}
            custom={index * 0.07}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="panel-muted p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent-bg text-accent">
                <Icon className="h-5 w-5" />
              </span>
              {item.step && (
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-muted">Step {item.step}</span>
              )}
            </div>
            <h3 className="mt-4 font-semibold text-text-primary">{item.title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{item.text}</p>
          </motion.article>
        );
      })}
    </div>
  );
}
