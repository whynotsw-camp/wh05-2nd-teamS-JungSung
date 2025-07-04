import Replicate from "replicate";

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

    // Vercel 배포 URL을 기반으로 웹훅 주소 동적 생성
    const webhookUrl = `https://${req.headers.host}/api/webhook`;

    const prediction = await replicate.predictions.create({
      version: "ohdurma/feple-ai-backend:aabfccaa466810596c17946b24c967767202dc921684cd141bdd943202aacad8",
      input: {
        audio: base64Audio
      },
      // --- 웹훅 설정 추가 ---
      webhook: webhookUrl,
      webhook_events_filter: ["completed"] // 'completed' 상태일 때만 알림 받기
    });

    res.status(201).json(prediction);
  } catch (error) {
    console.error("Replicate 예측 생성 오류:", error);
    res.status(500).json({ detail: "AI 모델 작업 시작에 실패했습니다." });
  }
}