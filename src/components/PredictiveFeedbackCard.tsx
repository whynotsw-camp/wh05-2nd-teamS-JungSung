export default function PredictiveFeedbackCard() {
  return (
    <div className="bg-card border border-border shadow-card p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-primary">
        다음 주 예측 피드백
      </h2>
      <div className="space-y-2 text-sm text-gray-800">
        <p>
          <span className="font-semibold text-accent">예측 상담 유형:</span>{" "}
          감정관리 상담 비율 증가 예상
        </p>
        <p>
          <span className="font-semibold text-accent">예상 근거:</span> 최근
          2주간 고객 불만 유형 비중 증가 (22% → 31%)
        </p>
        <p>
          <span className="font-semibold text-accent">추천 액션:</span> 감정
          공감 표현 예시 복습 및 상담 스크립트 사전 확인
        </p>
      </div>
      <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition">
        관련 콘텐츠 보기
      </button>
    </div>
  );
}
