"use client";

import { motion } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-bg text-text-primary">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <BrandLogo className="mx-auto h-16" />
        <h2 className="mt-4 font-display text-3xl text-text-primary">Growing Circular Value</h2>
      </motion.div>
    </div>
  );
}
