import { useMemo } from "react";
import { Session } from "../types"; // Session 타입 정의가 필요할 수 있습니다.

interface PolitenessData {
  metric: string;
  value: number;
}

export const usePolitenessData = (sessions: Session[]) => {
  const politenessData = useMemo(() => {
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

    return data;
  }, [sessions]);

  return politenessData;
};
