// CoachingDiary.tsx

export default function CoachingDiary() {
  const logs = [
    {
      date: "2025.04.01",
      highlight: "공감 표현 부족",
      note: "상담 중 고객의 불만 표현에 대해 '그럴 수 있습니다', '죄송합니다' 같은 기본 응답만 사용되었음.",
      recommendation:
        "공감 표현 예시: '고객님 입장에서 충분히 불편하셨을 것 같아요.' 등 3가지 숙지 필요.",
    },
    {
      date: "2025.04.08",
      highlight: "침묵 비율 감소 👍🏻",
      note: "불필요한 대화 공백 시간이 지난주 대비 12% 감소하며 평균 상담 시간이 1분 단축됨.",
      recommendation: "이번 주 동일 패턴 유지 + FAQ 응답 스크립트 사용률 점검",
    },
    {
      date: "2025.04.15",
      highlight: "긍정 언어 사용 증가",
      note: "'도와드릴게요', '걱정 마세요' 등 긍정 문장 사용 비율이 68%로 상승함.",
      recommendation: "해당 표현 유지 + 다음 주 '공감 표현 챌린지' 추천 참여",
    },
  ];

  return (
    <div className="bg-card border border-border shadow-card p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-primary">코칭 다이어리</h2>
      <ul className="space-y-4">
        {logs.map((log, index) => (
          <li
            key={index}
            className="p-4 bg-secondary border border-border rounded-lg hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">{log.date}</p>
              <span className="text-xs bg-primary/10 text-primary font-medium px-2 py-1 rounded-full">
                WEEK {logs.length - index}
              </span>
            </div>
            <p className="text-base font-semibold text-accent mb-1">
              📝 {log.highlight}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{log.note}</p>
            <p className="text-sm text-primary font-medium mt-2">
              📌 {log.recommendation}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
