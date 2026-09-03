import { Droplets, Leaf } from "lucide-react";

function formatCompact(value) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value || 0);
}

function formatFull(value) {
  return new Intl.NumberFormat("en").format(value || 0);
}

function MiniBarChart({ stats, valueKey, color, icon: Icon, label, unit, totalLabel }) {
  const max = Math.max(1, ...stats.map((stat) => Number(stat[valueKey]) || 0));
  const total = stats.reduce((sum, stat) => sum + (Number(stat[valueKey]) || 0), 0);

  return (
    <div className="panel p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${color}1f`, color }}>
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm text-text-secondary">{label}</p>
          <p className="font-display text-2xl text-text-primary">
            {formatCompact(total)} <span className="text-sm font-sans font-normal text-text-secondary">{unit}</span>
          </p>
          <p className="text-xs text-text-muted">{totalLabel}</p>
        </div>
      </div>

      <div className="mt-6 flex h-40 items-end gap-2.5 sm:gap-4">
        {stats.map((stat) => {
          const value = Number(stat[valueKey]) || 0;
          const pct = Math.max(4, (value / max) * 100);

          return (
            <div key={stat.year} className="group flex flex-1 flex-col items-center gap-2">
              <div className="relative flex h-32 w-full items-end justify-center">
                <div
                  title={`${stat.year}: ${formatFull(value)} ${unit}`}
                  className="w-full max-w-[2.5rem] rounded-t-lg transition-all duration-300 group-hover:opacity-90"
                  style={{ height: `${pct}%`, backgroundColor: color }}
                />
                <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-text-secondary opacity-0 transition-opacity group-hover:opacity-100">
                  {formatCompact(value)}
                </span>
              </div>
              <span className="text-xs text-text-muted">{stat.year}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ImpactChart({ stats }) {
  if (!stats || stats.length === 0) {
    return null;
  }

  const sorted = [...stats].sort((a, b) => a.year - b.year);
  const latest = sorted[sorted.length - 1];

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-text-muted">
        Updated through {latest.year} · Figures maintained by Revive Fiber Co
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <MiniBarChart
          stats={sorted}
          valueKey="water_saved_liters"
          color="#3b82c4"
          icon={Droplets}
          label="Water Saved"
          unit="Liters"
          totalLabel="Total across all reported years"
        />
        <MiniBarChart
          stats={sorted}
          valueKey="carbon_saved_kg"
          color="#2f7a54"
          icon={Leaf}
          label="Carbon Emission Saved"
          unit="kg CO2e"
          totalLabel="Total across all reported years"
        />
      </div>
    </div>
  );
}
