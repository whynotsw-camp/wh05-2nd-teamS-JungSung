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
  const { loading, kpi, midData, contentData, topNouns } = useDashboardData();
  const COLORS = ["#6C10BE", "#FF007C", "#02075D", "#FFCC00", "#8DD1E1"];

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">데이터 로딩 중…</div>
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
