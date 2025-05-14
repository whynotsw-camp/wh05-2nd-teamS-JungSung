// src/pages/Dashboard.tsx
import { motion } from "framer-motion";
import KpiGrid from "../components/KPIGrid";
import { PieDistribution } from "../components/PieDistribution";
import { useDashboardData } from "../hooks/useDashboardData";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Dashboard() {
  const { loading, kpi, midData, contentData } = useDashboardData();
  const COLORS = ["#6C10BE", "#FF007C", "#02075D", "#FFCC00", "#8DD1E1"];

  // KPI 카드가 총 8개로 늘어났으니, 로딩 스켈레톤도 8개를 보여줍니다.
  const KPI_SLOTS = 8;

  if (loading) {
    return (
      <motion.div
        className="p-6 space-y-6 animate-pulse"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 1. 스켈레톤 KPI 카드 (8개) */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: KPI_SLOTS }).map((_, idx) => (
            <div key={idx} className="h-20 bg-gray-200 rounded-xl" />
          ))}
        </div>

        {/* 2. 스켈레톤 파이 차트 자리 (2개) */}
        <div className="grid gap-8 lg:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. KPI 카드 */}
      <motion.div variants={itemVariants}>
        <KpiGrid items={kpi} />
      </motion.div>

      {/* 2. 파이차트 분포 */}
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div variants={itemVariants}>
          <PieDistribution
            title="보통 이런 주제로 상담했어요"
            data={midData}
            colors={COLORS}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <PieDistribution
            title="보통 이런 유형으로 상담했어요"
            data={contentData}
            colors={COLORS}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
