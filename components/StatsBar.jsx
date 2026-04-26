"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function StatsBar({ stats }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 });

  return (
    <section ref={ref} className="bg-forest px-5 py-14 text-cream">
      <div className="mx-auto grid w-full max-w-6xl gap-8 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label}>
            <div className="text-4xl font-bold">
              {inView ? <CountUp end={item.value} duration={2} separator="," /> : 0}
              {item.suffix || ""}
            </div>
            <p className="mt-2 text-sm text-cream/80">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
