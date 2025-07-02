import Replicate from "replicate";

// Replicate 클라이언트 초기화
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN, // Vercel에 설정한 환경 변수 사용
});

// Vercel 서버리스 함수의 기본 설정을 오버라이드하여 파일 스트림을 처리
export const config = {
  api: {
    bodyParser: false,
  },
};

// 파일을 버퍼로 변환하는 헬퍼 함수
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
    const output = await replicate.run(
      // 중요: 모델 페이지의 'Versions' 탭에서 실제 버전을 복사해 사용하세요.
      "ohdurma/feple-ai-backend:aabfccaa466810596c17946b24c967767202dc921684cd141bdd943202aacad8",
      {
        input: {
          audio: base64Audio
        }
      }
    );
    console.log("분석 완료!");
    
    res.status(200).json(output);

  } catch (error) {
    console.error("Replicate API 호출 오류:", error);
    res.status(500).json({ detail: "서버에서 AI 모델을 호출하는 중 오류가 발생했습니다." });
  }
}