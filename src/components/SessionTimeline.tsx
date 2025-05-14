import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianGrid,
} from "recharts";

interface Segment {
  start: number;
  emotion_score: number;
  scriptCompliance: number;
  silence_ratio: number;
}

interface SessionTimelineProps {
  segments: Segment[];
}

export function SessionTimeline({ segments }: SessionTimelineProps) {
  const data = segments.map((seg) => ({
    time: seg.start,
    emotion: seg.emotion_score,
    script: seg.scriptCompliance * 100,
    silence: seg.silence_ratio * 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="4 4" opacity={0.3} />
        <XAxis dataKey="time" tick={{ fill: "#444" }} />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="emotion"
          name="감정 점수"
          fill="#6C10BE"
          stroke="#6C10BE"
        />
        <Area
          type="monotone"
          dataKey="script"
          name="스크립트 준수"
          fill="#FF007C"
          stroke="#FF007C"
        />
        <Area
          type="monotone"
          dataKey="silence"
          name="침묵 비율"
          fill="#02075D"
          stroke="#02075D"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
