import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { label: "요금 문의", value: 45 },
  { label: "서비스 불만", value: 30 },
  { label: "신규 가입", value: 15 },
  { label: "기타", value: 10 },
];

const COLORS = ["#EB008B", "#8D99AE", "#B4A69F", "#F7F1E1"];

export default function TypePieChart() {
  return (
    <div className="bg-card border border-border shadow-card p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-primary">상담 유형 분포</h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={50}
            dataKey="value"
            nameKey="label"
            paddingAngle={3}
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}건`, name]} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
