"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function StatsBar({ stats }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 });

  return (
    <section ref={ref} className="page-shell py-14">
      <div className="panel grid gap-0 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="border-b border-border px-7 py-8 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 md:px-10">
            <div className="font-display text-[clamp(2.2rem,4vw,4.1rem)] text-text-primary">
              {inView ? <CountUp end={item.value} duration={2} separator="," /> : 0}
              {item.suffix || ""}
            </div>
            <p className="mt-2 text-sm text-text-secondary">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
