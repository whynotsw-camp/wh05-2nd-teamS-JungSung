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
        const isSessionsCard = kpi.label.startsWith("현재까지");
        const isPolitenessCard =
          kpi.label.startsWith("상담사님의 존댓말 사용 비율은");

        const content = (
          <div
            className={`bg-white rounded-xl p-5 shadow hover:shadow-lg transition-shadow ${
              isSessionsCard || isPolitenessCard ? "cursor-pointer" : ""
            }`}
          >
            <h4 className="flex items-center text-uplus-magenta font-medium mb-2">
              {kpi.label}
            </h4>

            {/* 값과 화살표 아이콘 */}
            <div className="mt-1 flex items-center justify-between">
              <p className="font-headline text-gray-900 text-lg">{kpi.value}</p>
              {(isSessionsCard || isPolitenessCard) && (
                <ArrowRightIcon className="w-4 h-4 text-uplus-magenta" />
              )}
            </div>
          </div>
        );

        if (isSessionsCard) {
          return (
            <Link key={idx} to="/sessions">
              {content}
            </Link>
          );
        }
        if (isPolitenessCard) {
          return (
            <Link key={idx} to="/politeness">
              {content}
            </Link>
          );
        }
        return <div key={idx}>{content}</div>;
      })}
    </div>
  );
}
