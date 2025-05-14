import { Link } from "react-router-dom";
import { KPIType } from "../hooks/useDashboardData";

interface KpiGridProps {
  items: KPIType[];
}

export default function KpiGrid({ items }: KpiGridProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((kpi, idx) => {
        const card = (
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-shadow">
            <h4 className="text-gray-600 font-medium">{kpi.label}</h4>
            <p
              className={`mt-1 font-headline text-gray-800 text-lg
              }`}
            >
              {kpi.value}
            </p>
          </div>
        );

        if (kpi.label.startsWith("현재까지 진행된 상담은")) {
          return (
            <Link key={idx} to="/sessions">
              {card}
            </Link>
          );
        }
        return <div key={idx}>{card}</div>;
      })}
    </div>
  );
}
