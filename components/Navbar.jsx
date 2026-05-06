"use client";

import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
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

const workWithUsLinks = [
  { href: "/careers", label: "Careers" },
  { href: "/clients/apply", label: "Partnerships" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [workWithUsOpen, setWorkWithUsOpen] = useState(false);
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

          <div className="relative">
            <button
              className="flex items-center gap-1 text-sm transition-colors text-text-secondary hover:text-text-primary"
              onClick={() => setWorkWithUsOpen(!workWithUsOpen)}
            >
              Work With Us
              <ChevronDown className={`h-4 w-4 transition-transform ${workWithUsOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {workWithUsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-surface panel shadow-lg"
                >
                  <div className="flex flex-col gap-1 p-2">
                    {workWithUsLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded px-3 py-2 text-sm text-text-secondary hover:bg-bg hover:text-text-primary transition-colors"
                        onClick={() => setWorkWithUsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
              <div className="pt-2 border-t border-border/50">
                <p className="text-xs font-medium text-text-secondary px-1 mb-2">Work With Us</p>
                <div className="flex flex-col gap-2 pl-2">
                  {workWithUsLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
