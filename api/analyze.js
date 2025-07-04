import Replicate from "replicate";
import { createClient } from "@supabase/supabase-js";

// --- Supabase 클라이언트 초기화 ---
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);
// ---------------------------------

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const streamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ detail: 'Method Not Allowed' });
  }

  try {
    const buffer = await streamToBuffer(req);
    const base64Audio = `data:audio/wav;base64,${buffer.toString("base64")}`;

    console.log("Replicate 분석 시작...");
    const analysisOutput = await replicate.run(
      "ohdurma/feple-ai-backend:aabfccaa466810596c17946b24c967767202dc921684cd141bdd943202aacad8",
      {
        input: {
          audio: base64Audio
        }
      }
    );
    console.log("분석 완료! Supabase에 저장 시작...");

    // --- Supabase에 결과 저장 ---
    const { metrics, transcript } = analysisOutput;
    
    const { error: dbError } = await supabase
      .from('analysis_results')
      .insert({ 
        session_id: metrics.session_id, 
        metrics: metrics,
        transcript: transcript,
        // user_id는 나중에 인증 기능 추가 시 연결합니다.
      });

    if (dbError) {
      throw new Error(`데이터베이스 저장 실패: ${dbError.message}`);
    }
    console.log("Supabase에 저장 완료.");
    // -------------------------
    
    res.status(200).json(analysisOutput);

  } catch (error) {
    console.error("전체 프로세스 오류:", error);
    res.status(500).json({ detail: "서버에서 오류가 발생했습니다." });
  }
}