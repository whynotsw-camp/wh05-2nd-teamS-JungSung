import { TopNoun } from "../hooks/useDashboardData";

interface TopKeywordsProps {
  items: TopNoun[];
}

export default function TopKeywords({ items }: TopKeywordsProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <h4 className="text-gray-700 font-medium mb-3">
        상담사님께서 자주 사용하신 키워드에요
      </h4>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        {items.map((n, i) => (
          <li key={i}>
            {n.word}
            <span className="text-sm text-gray-400"> ({n.count}회)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
