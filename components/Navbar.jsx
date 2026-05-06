"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Our Products" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b border-border/70 bg-bg/65 backdrop-blur-xl transition-all duration-300 ${scrolled ? "rounded-b-2xl shadow-lg" : ""}`}>
      <nav className="page-shell flex items-center justify-between py-5">
        <Link href="/" className="flex items-center">
          <BrandLogo className="h-11" />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/work-with-us"
            className="inline-flex items-center justify-center rounded-full border border-border bg-accent-bg px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-accent shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-white hover:shadow-soft dark:border-accent/30 dark:bg-accent dark:text-white dark:hover:bg-accent-h"
          >
            Work With Us
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="rounded-xl border border-border bg-surface p-2 text-text-primary md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="page-shell panel mb-3 px-5 pb-5 md:hidden"
          >
            <div className="flex flex-col gap-3 pt-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-secondary"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/work-with-us"
                className="mt-2 inline-flex items-center justify-center rounded-full border border-border bg-accent-bg px-5 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.08em] text-accent shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-white hover:shadow-soft dark:border-accent/30 dark:bg-accent dark:text-white dark:hover:bg-accent-h"
                onClick={() => setOpen(false)}
              >
                Work With Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
