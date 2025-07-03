import { motion } from "framer-motion";
import { useSessionData } from "../hooks/useSessionData";
import { usePolitenessData } from "../hooks/usePolitenessData";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function PolitenessPage() {
  const { sessions } = useSessionData();
  const data = usePolitenessData(sessions);

  return (
    <motion.div
      className="p-6 space-y-6 bg-gray-50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* 타이틀 */}
      <motion.h2
        className="text-base md:text-lg font-semibold text-uplus-magenta"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        상담사님의 친절도를 분석해봤어요 ☺️
      </motion.h2>

      {/* 레이더 차트 박스 */}
      <motion.div
        className="w-full h-96 bg-white rounded-2xl shadow-lg p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="85%" data={data}>
            <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="metric"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#374151", fontSize: 13, fontWeight: 500, dy: 4 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tickCount={6}
              axisLine={false}
              tick={{ fill: "#6B7280", fontSize: 11 }}
            />
            <Radar
              name="상대비율(%)"
              dataKey="value"
              stroke="#cc338b"
              fill="#cc338b"
              fillOpacity={0.5}
              isAnimationActive
              animationDuration={500}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}