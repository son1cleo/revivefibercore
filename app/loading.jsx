"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-bg text-text-primary">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Revive Fiber Core</p>
        <h2 className="mt-2 font-display text-3xl">Growing Circular Value</h2>
      </motion.div>
    </div>
  );
}
