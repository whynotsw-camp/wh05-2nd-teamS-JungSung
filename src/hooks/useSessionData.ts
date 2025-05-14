// src/hooks/useSessionData.ts
import { useState, useEffect } from "react";
import Papa from "papaparse";
import rawData from "../data/text_features_all_training.csv?raw";

export interface SessionRecord {
  session_id: string;
  asr_segments: Array<{
    start: number;
    end: number;
    emotion_score: number;
    scriptCompliance: number;
    silence_ratio: number;
    [key: string]: any;
  }>;
  고객_sent_score: number;
  상담사_sent_score: number;
  conflict_flag: number;
  alternative_suggestion_count: number;
  silence_ratio: number;
  script_phrase_ratio: number;
}

// 1) 모듈-레벨 캐시
let sessionDataCache: SessionRecord[] | null = null;
let sessionDataPromise: Promise<SessionRecord[]> | null = null;

function parseSessions(): Promise<SessionRecord[]> {
  if (!sessionDataPromise) {
    sessionDataPromise = new Promise((resolve) => {
      Papa.parse<any>(rawData, {
        header: true,
        dynamicTyping: true,
        complete: ({ data: parsed }) => {
          const cleaned: SessionRecord[] = parsed.map((r) => {
            let segments: any[] = [];
            if (typeof r.asr_segments === "string") {
              try {
                // Python 리터럴을 JS eval로 파싱
                // eslint-disable-next-line no-eval
                segments = eval(r.asr_segments);
              } catch {
                segments = [];
              }
            }
            return {
              session_id: String(r.session_id),
              asr_segments: segments,
              고객_sent_score: r["고객_sent_score"],
              상담사_sent_score: r["상담사_sent_score"],
              conflict_flag: r["conflict_flag"],
              alternative_suggestion_count: r["alternative_suggestion_count"],
              silence_ratio: r["silence_ratio"],
              script_phrase_ratio: r["script_phrase_ratio"],
            };
          });
          sessionDataCache = cleaned; // 캐시에 저장
          resolve(cleaned);
        },
      });
    });
  }
  return sessionDataPromise;
}

export function useSessionData() {
  // 2) 초기 상태를 캐시 유무에 따라 셋업
  const [sessions, setSessions] = useState<SessionRecord[]>(
    () => sessionDataCache ?? []
  );
  const [loading, setLoading] = useState<boolean>(
    () => sessionDataCache === null
  );

  useEffect(() => {
    if (sessionDataCache) return;
    parseSessions().then((data) => {
      setSessions(data);
      setLoading(false);
    });
  }, []);

  return { loading, sessions };
}
