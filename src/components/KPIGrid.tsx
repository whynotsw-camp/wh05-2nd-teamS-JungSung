import { Link } from "react-router-dom";
import { KPIType } from "../hooks/useDashboardData";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface KpiGridProps {
  items: KPIType[];
}

export default function KpiGrid({ items }: KpiGridProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((kpi, idx) => {
        const isLinkCard = kpi.label.startsWith("현재까지");

        const content = (
          <div
            className={`bg-white rounded-xl p-5 shadow hover:shadow-lg transition-shadow ${
              isLinkCard ? "cursor-pointer" : ""
            }`}
          >
            {/* 레이블 */}
            <h4 className="text-uplus-magenta font-medium">{kpi.label}</h4>

            {/* 값과 아이콘을 한 줄에 배치 */}
            <div className="mt-1 flex items-center justify-between">
              <p className="font-headline text-gray-900 text-lg">{kpi.value}</p>
              {isLinkCard && (
                <ArrowRightIcon className="w-4 h-4 text-uplus-magenta" />
              )}
            </div>
          </div>
        );

        return isLinkCard ? (
          <Link key={idx} to="/sessions">
            {content}
          </Link>
        ) : (
          <div key={idx}>{content}</div>
        );
      })}
    </div>
  );
}
