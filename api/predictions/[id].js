import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const prediction = await replicate.predictions.get(id);

    if (prediction.error) {
      return res.status(500).json({ detail: prediction.error });
    }
    res.status(200).json(prediction);
  } catch (error) {
    res.status(500).json({ detail: "작업 상태를 가져오는 데 실패했습니다." });
  }
}