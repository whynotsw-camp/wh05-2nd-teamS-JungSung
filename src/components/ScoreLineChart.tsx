import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { week: "3주 전", score: 80 },
  { week: "2주 전", score: 83 },
  { week: "지난주", score: 86 },
  { week: "이번주", score: 87 },
];

export default function ScoreLineChart() {
  return (
    <div className="bg-card border border-border shadow-card p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-primary">총 점수 추이</h2>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis
            dataKey="week"
            tick={{ fill: "#1C1C1C", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#1C1C1C", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E0E0E0",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#1C1C1C", fontWeight: 500 }}
            formatter={(value: number) => [`${value}점`, "점수"]}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#EB008B"
            strokeWidth={3}
            dot={{ r: 5, stroke: "#EB008B", strokeWidth: 2, fill: "#FFFFFF" }}
            activeDot={{ r: 6, fill: "#EB008B" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
