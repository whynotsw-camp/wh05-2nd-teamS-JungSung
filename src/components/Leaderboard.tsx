import CountUp from "react-countup";

const ranks = [
  { name: "오정우", score: 95 },
  { name: "김기훈", score: 92 },
  { name: "오현서", score: 87 },
  { name: "노준석", score: 85 }, // ← 본인 강조
  { name: "김상담", score: 83 },
];

export default function Leaderboard() {
  return (
    <div className="bg-card border border-border shadow-card p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-primary">팀 순위 Top 5</h2>
      <ul className="divide-y divide-border">
        {ranks.map((user, index) => {
          const isMe = user.name === "오정우";
          return (
            <li
              key={index}
              className={`flex justify-between items-center px-4 py-3 rounded-lg transition-all ${
                isMe
                  ? "bg-primary/10 border-l-4 border-primary text-primary font-semibold"
                  : "hover:bg-gray-100 text-accent"
              }`}
            >
              <span>
                <span className="font-medium mr-1">{index + 1}.</span>{" "}
                {user.name}
              </span>
              <span className="text-sm font-medium">
                <CountUp end={user.score} duration={1.2} suffix="점" />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
