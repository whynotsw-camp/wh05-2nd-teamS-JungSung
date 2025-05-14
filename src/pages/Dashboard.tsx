import KpiGrid from "../components/KPIGrid";
import { PieDistribution } from "../components/PieDistribution";
// import TopKeywords from "../components/TopKeywords";
import { useDashboardData } from "../hooks/useDashboardData";

export default function Dashboard() {
  const { loading, kpi, midData, contentData, topNouns } = useDashboardData();
  const COLORS = ["#6C10BE", "#FF007C", "#02075D", "#FFCC00", "#8DD1E1"];

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">데이터 로딩 중…</div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* 1. KPI 카드 */}
      <KpiGrid items={kpi} />

      {/* 2. 파이차트 분포 */}
      <div className="grid gap-8 lg:grid-cols-2">
        <PieDistribution
          title="보통 이런 주제로 상담했어요"
          data={midData}
          colors={COLORS}
        />
        <PieDistribution
          title="보통 이런 유형으로 상담했어요"
          data={contentData}
          colors={COLORS}
        />
      </div>
    </div>
  );
}
