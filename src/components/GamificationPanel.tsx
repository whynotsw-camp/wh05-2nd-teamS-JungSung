export default function GamificationPanel() {
  const missions = [
    {
      title: "공감 마스터 챌린지",
      description: "고객 응대 중 공감 표현 15회 이상 사용",
      progress: 12,
      goal: 15,
      reward: "공감 배지 + 포인트 50점",
    },
    {
      title: "무응답 제로 미션",
      description: "침묵 비율 5% 이하 유지",
      progress: 5,
      goal: 5,
      reward: "스타벅스 기프티콘 응모권 🎁",
    },
    {
      title: "FAQ 활용 챌린지",
      description: "상담 중 추천 스크립트 10회 이상 활용",
      progress: 7,
      goal: 10,
      reward: "추가 휴식 10분권 💤",
    },
  ];

  return (
    <div className="bg-card border border-border shadow-card p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-primary">이번 주 미션</h2>
      <ul className="space-y-4">
        {missions.map((mission, index) => {
          const percentage = Math.min(
            Math.round((mission.progress / mission.goal) * 100),
            100
          );
          return (
            <li
              key={index}
              className="border border-border bg-secondary p-4 rounded-lg"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-semibold text-accent">
                  ✅ {mission.title}
                </h3>
                <span className="text-xs text-gray-500">
                  {mission.progress}/{mission.goal}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                {mission.description}
              </p>
              <div className="w-full bg-border rounded-full h-2 mb-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-xs text-primary font-medium">
                🎁 보상: {mission.reward}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
