import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { PieDatum } from "../hooks/useDashboardData";

interface PieDistributionProps {
  title: string;
  data: PieDatum[];
  colors: string[];
}

export function PieDistribution({ title, data, colors }: PieDistributionProps) {
  // 기본 레이블을 차트 외곽에 배치
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    payload,
    value,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="#555"
        className="text-xs font-medium"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${payload.name} (${value}건)`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <h4 className="text-gray-700 font-medium mb-3">{title}</h4>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            nameKey="name"
            label={renderCustomizedLabel}
            labelLine={false}
            isAnimationActive={false}
            cursor="pointer"
          >
            {data.map((_, idx) => (
              <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v: number) => `${v}건`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
