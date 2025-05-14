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

interface DashboardProps {
  printRef: React.RefObject<HTMLDivElement | null>;
}

export default function Dashboard({ printRef }: DashboardProps) {
  const { loading, kpi, midData, contentData } = useDashboardData();
  const COLORS = ["#6C10BE", "#FF007C", "#02075D", "#FFCC00", "#8DD1E1"];
  const KPI_SLOTS = 8;

  if (loading) {
    return (
      <motion.div
        ref={printRef}
        className="p-6 space-y-6 animate-pulse"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: KPI_SLOTS }).map((_, idx) => (
            <div key={idx} className="h-20 bg-gray-200 rounded-xl" />
          ))}
        </div>
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
      ref={printRef}
      className="p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <KpiGrid items={kpi} />
      </motion.div>
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
