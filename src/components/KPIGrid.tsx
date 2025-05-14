import { KPIType } from "../hooks/useDashboardData";

interface KpiGridProps {
  items: KPIType[];
}

export default function KpiGrid({ items }: KpiGridProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((k, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-shadow"
        >
          <h4 className="text-gray-600 font-medium">{k.label}</h4>
          <p
            className={`mt-1 font-headline text-gray-800 ${
              k.value.startsWith("아직") ? "text-lg" : "text-lg"
            }`}
          >
            {k.value}
          </p>
        </div>
      ))}
    </div>
  );
}
