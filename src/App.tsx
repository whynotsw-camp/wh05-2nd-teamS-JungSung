import OverviewCard from "./components/OverviewCard";
import FeedbackTabs from "./components/FeedbackTabs";

export default function App() {
  return (
    <div className="min-h-screen p-8 bg-secondary">
      <h1 className="text-2xl font-bold text-primary mb-6">
        LG U+ 상담사 대시보드
      </h1>

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <OverviewCard title="총 점수" value="87점" subtitle="(상위 20%)" />
        <OverviewCard title="주간 달성률" value="75%" />
        <OverviewCard title="현재 레벨" value="Lv. 5" />
        <OverviewCard title="획득 배지" value="12개" />
      </div>

      <div className="mb-10">
        <FeedbackTabs />
      </div>
    </div>
  );
}
