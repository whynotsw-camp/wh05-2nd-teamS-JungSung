import { motion } from "framer-motion";
import { useSessionData } from "../hooks/useSessionData";
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
  const total = sessions.length || 1;

  // 1) 네 가지 지표 평균 계산 (0~1)
  const avgRequest =
    sessions.reduce((sum, s) => sum + s.request_ratio, 0) / total;
  const avgEuphonious =
    sessions.reduce((sum, s) => sum + s.euphonious_word_ratio, 0) / total;
  const avgPositive =
    sessions.reduce((sum, s) => sum + s.positive_word_ratio, 0) / total;
  const avgHonorific =
    sessions.reduce((sum, s) => sum + s.honorific_ratio, 0) / total;

  // 2) % 단위 rawData
  const rawData = [
    { metric: "요청 화법 사용", value: avgRequest * 100 },
    { metric: "완곡어 사용", value: avgEuphonious * 100 },
    { metric: "긍정 단어 사용", value: avgPositive * 100 },
    { metric: "존댓말 사용", value: avgHonorific * 100 },
  ];

  // 3) 가장 큰 값을 기준으로 상대값(0~100)으로 정규화
  const maxValue = Math.max(...rawData.map((d) => d.value), 1);
  const data = rawData.map((d) => ({
    metric: d.metric,
    value: (d.value / maxValue) * 100,
  }));

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
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        상담사님의 친절도를 분석해봤어요 ☺️
      </motion.h2>

      {/* 레이더 차트 박스 */}
      <motion.div
        className="w-full h-96 bg-white rounded-2xl shadow-lg p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
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
