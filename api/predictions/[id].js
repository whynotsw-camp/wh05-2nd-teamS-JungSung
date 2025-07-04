import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  try {
    // URL 경로에서 동적인 부분, 즉 예측 ID를 가져옵니다.
    // 예: /api/predictions/cdqdd7y... -> 'cdqdd7y...'
    const { id } = req.query;

    // Replicate 클라이언트를 사용해 특정 예측의 상태를 가져옵니다.
    const prediction = await replicate.predictions.get(id);

    // Replicate가 오류를 반환한 경우, 그 내용을 그대로 전달합니다.
    if (prediction.error) {
      return res.status(500).json({ detail: prediction.error });
    }

    // 성공한 경우, Replicate로부터 받은 예측 객체 전체를 반환합니다.
    res.status(200).json(prediction);

  } catch (error) {
    console.error("Replicate 상태 확인 오류:", error);
    res.status(500).json({ detail: "작업 상태를 가져오는 데 실패했습니다." });
  }
}