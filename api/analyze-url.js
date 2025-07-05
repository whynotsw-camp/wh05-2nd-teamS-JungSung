import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ detail: 'Method Not Allowed' });
  }

  try {
    const { audioUrl } = req.body;

    if (!audioUrl) {
      return res.status(400).json({ detail: "audioUrl이 요청에 포함되지 않았습니다." });
    }

    const webhookUrl = `https://${req.headers.host}/api/webhook`;

    const prediction = await replicate.predictions.create({
      version: "ohdurma/feple-ai-backend:aabfccaa466810596c17946b24c967767202dc921684cd141bdd943202aacad8",
      input: { audio: audioUrl },
      webhook: webhookUrl,
      webhook_events_filter: ["completed"]
    });
    
    res.status(201).json(prediction);

  } catch (error) {
    console.error("Replicate 예측 생성 오류:", error);
    res.status(500).json({ detail: "AI 모델 작업 시작에 실패했습니다." });
  }
}