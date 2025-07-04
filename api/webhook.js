import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 초기화
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // Replicate는 항상 POST 요청으로 웹훅을 보냅니다.
  if (req.method !== 'POST') {
    return res.status(405).json({ detail: 'Method Not Allowed' });
  }

  const prediction = req.body;

  // 작업이 성공적으로 완료된 경우에만 DB에 저장
  if (prediction.status === "succeeded") {
    console.log("웹훅 수신: 분석 완료. Supabase에 저장 시작...");

    const { metrics, transcript } = prediction.output;

    const { error: dbError } = await supabase
      .from('analysis_results')
      .insert({ 
        session_id: metrics.session_id, 
        metrics: metrics,
        transcript: transcript,
      });

    if (dbError) {
      console.error(`데이터베이스 저장 실패: ${dbError.message}`);
      // 여기서 오류가 나도 Replicate에 500을 보내면, Replicate는 재시도를 할 수 있습니다.
      return res.status(500).json({ detail: "DB 저장 실패" });
    }

    console.log(`세션 ID ${metrics.session_id} 저장 완료.`);
  }

  // Replicate에 성공적으로 받았다고 응답
  res.status(200).end();
}