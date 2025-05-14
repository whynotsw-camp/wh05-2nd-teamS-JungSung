import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { PieDatum } from "../hooks/useDashboardData";

interface PieDistributionProps {
  title: string;
  data: PieDatum[];
  colors: string[];
}

export function PieDistribution({ title, data, colors }: PieDistributionProps) {
  const renderLabel = (entry: any) => `${entry.name} (${entry.value}건)`;

  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <h4 className="text-gray-700 font-medium mb-3">{title}</h4>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={renderLabel}
            labelLine={false}
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={colors[idx % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v: number) => `${v}건`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
