"use client";

import { Factory, Globe2, Package, Users } from "lucide-react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const iconMap = { Factory, Users, Package, Globe2 };

export default function StatsBar({ stats }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 });

  return (
    <section ref={ref} className="page-shell py-14">
      <p className="section-label">By The Numbers</p>
      <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.12] text-text-primary">A Snapshot of Our Operation</h2>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = iconMap[item.icon] || Factory;

          return (
            <motion.div
              key={item.description}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="panel group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-soft"
            >
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />

              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-bg text-accent">
                <Icon className="h-6 w-6" />
              </span>

              <div className="mt-5 font-display text-[clamp(1.6rem,2.4vw,2.3rem)] leading-tight text-text-primary">
                {item.value != null ? (
                  <>
                    {inView ? <CountUp end={item.value} duration={2} separator="," /> : 0}
                    {item.suffix}
                  </>
                ) : (
                  item.headline
                )}
              </div>

              <p className="mt-2 text-sm text-text-secondary">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
