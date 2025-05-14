import { useState, useEffect } from "react";
import Papa from "papaparse";
import rawData from "../data/text_features_all_training.csv?raw";

export interface SessionRecord {
  session_id: string;

  // 화면에 뿌릴 최소 정보만 남깁니다.
  asr_segments: Array<{
    speaker: string;
    text: string;
  }>;

  // 감정 점수 & 레이블
  고객_sent_score: number;
  고객_sent_label: "긍정" | "중립" | "부정";

  상담사_sent_score: number;
  상담사_sent_label: "긍정" | "중립" | "부정";

  // 기타 메타
  mid_category: string;
  content_category: string;
  top_nouns: string[];
  // 필요 없어진 필드는 빼도 무방합니다.
}

// 모듈 레벨 캐시
let sessionDataCache: SessionRecord[] | null = null;
let sessionDataPromise: Promise<SessionRecord[]> | null = null;

// 실제 CSV 파싱 & 정리 로직
function parseSessions(): Promise<SessionRecord[]> {
  if (!sessionDataPromise) {
    sessionDataPromise = new Promise((resolve, reject) => {
      // 타입 정의: CSV에서 들어오는 원시 레코드
      interface RawCsvRecord {
        session_id: string;
        asr_segments: string | RawSegment[];
        top_nouns: string;
        고객_sent_score: number | string;
        고객_sent_label: string;
        상담사_sent_score: number | string;
        상담사_sent_label: string;
        mid_category: string;
        content_category: string;
      }

      // ASR 세그먼트의 원시 형태
      interface RawSegment {
        speaker: string;
        text: string;
        [key: string]: any;
      }

      // 감정 레이블 타입
      type SentimentLabel = "긍정" | "중립" | "부정";

      // Papa.parse complete 콜백 파라미터 타입
      interface ParseCompleteResult<T> {
        data: T[];
        errors: Papa.ParseError[];
        meta: Papa.ParseMeta;
      }

      Papa.parse<RawCsvRecord>(rawData, {
        header: true,
        dynamicTyping: true,
        complete: ({ data }: ParseCompleteResult<RawCsvRecord>): void => {
          try {
            const cleaned: SessionRecord[] = data.map(
              (r: RawCsvRecord): SessionRecord => {
                let rawSegments: RawSegment[] = [];
                if (typeof r.asr_segments === "string") {
                  try {
                    // eslint-disable-next-line no-eval
                    rawSegments = eval(r.asr_segments) as RawSegment[];
                  } catch {
                    rawSegments = [];
                  }
                } else {
                  rawSegments = r.asr_segments;
                }

                const segments: SessionRecord["asr_segments"] = rawSegments.map(
                  (seg: RawSegment): SessionRecord["asr_segments"][0] => ({
                    speaker: seg.speaker,
                    text: seg.text,
                  })
                );

                const nouns: string[] =
                  typeof r.top_nouns === "string"
                    ? r.top_nouns.split(",").map((s: string) => s.trim())
                    : [];

                const custLabel =
                  ((
                    r.고객_sent_label as SentimentLabel
                  )?.trim() as SentimentLabel) || "중립";
                const agentLabel =
                  ((
                    r.상담사_sent_label as SentimentLabel
                  )?.trim() as SentimentLabel) || "중립";

                return {
                  session_id: String(r.session_id),
                  asr_segments: segments,
                  고객_sent_score:
                    typeof r.고객_sent_score === "string"
                      ? parseFloat(r.고객_sent_score)
                      : (r.고객_sent_score as number),
                  고객_sent_label: custLabel,
                  상담사_sent_score:
                    typeof r.상담사_sent_score === "string"
                      ? parseFloat(r.상담사_sent_score)
                      : (r.상담사_sent_score as number),
                  상담사_sent_label: agentLabel,
                  mid_category: r.mid_category || "",
                  content_category: r.content_category || "",
                  top_nouns: nouns,
                };
              }
            );

            sessionDataCache = cleaned;
            resolve(cleaned);
          } catch (e) {
            reject(e);
          }
        },
      });
    });
  }
  return sessionDataPromise!;
}

/**
 * React hook
 */
export function useSessionData() {
  const [sessions, setSessions] = useState<SessionRecord[]>(
    () => sessionDataCache || []
  );
  const [loading, setLoading] = useState<boolean>(
    () => sessionDataCache === null
  );

  useEffect(() => {
    if (sessionDataCache) return;

    parseSessions()
      .then((data) => {
        setSessions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("세션 데이터 로드 실패", err);
        setSessions([]);
        setLoading(false);
      });
  }, []);

  return { loading, sessions };
}
