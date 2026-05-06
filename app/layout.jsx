import { DM_Mono, DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ThemeToggle from "@/components/ThemeToggle";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata = {
  title: "Revive Fiber Co | Sustainable Recycled Fiber",
  description: "Revive Fiber Co transforms textile waste into high-quality recycled fiber for modern sustainable manufacturing."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${dmMono.variable}`} suppressHydrationWarning>
      <body className="bg-bg text-text-primary antialiased [font-family:var(--font-body)]">
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
        <ThemeToggle />
      </body>
    </html>
  );
}
