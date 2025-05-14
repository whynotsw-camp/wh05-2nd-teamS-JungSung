import { SessionRecord } from "../hooks/useSessionData";

interface SessionCardProps {
  session: SessionRecord;
}

// 레이블에 따라 이모지 & 컬러 매핑
function SentimentIcon({ label }: { label: SessionRecord["고객_sent_label"] }) {
  let emoji: string, colorClass: string;
  switch (label) {
    case "긍정":
      emoji = "😊";
      colorClass = "text-green-500";
      break;
    case "부정":
      emoji = "☹️";
      colorClass = "text-red-500";
      break;
    default:
      emoji = "😐";
      colorClass = "text-yellow-500";
  }
  return <span className={`text-base ${colorClass}`}>{emoji}</span>;
}

export default function SessionCard({ session }: SessionCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-shadow">
      {/* 헤더: ID + 감정 */}
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-lg text-gray-800">
          상담 ID {session.session_id}번은
        </h4>

        <div className="flex items-center space-x-6">
          {/* 고객 감정 */}
          <div className="flex items-center space-x-1">
            <SentimentIcon label={session.고객_sent_label} />
            <span className="text-sm font-medium text-gray-700">
              고객: {session.고객_sent_label}
            </span>
          </div>
          {/* 상담사 감정 */}
          <div className="flex items-center space-x-1">
            <SentimentIcon label={session.상담사_sent_label} />
            <span className="text-sm font-medium text-gray-700">
              상담사: {session.상담사_sent_label}
            </span>
          </div>
        </div>
      </div>

      {/* 카테고리 설명 */}
      <p className="text-sm text-gray-700 mb-4">
        <span className="font-semibold text-uplus-magenta">
          {session.mid_category}
        </span>
        에 대한 내용이고,{" "}
        <span className="font-semibold text-uplus-magenta">
          {session.content_category}{" "}
        </span>
        유형입니다.
      </p>

      {/* 주요 키워드 */}
      {session.top_nouns.filter((n) => n.length > 1).length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {session.top_nouns
              .filter((n) => n.length > 1)
              .map((noun, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-uplus-magenta bg-opacity-20 text-uplus-magenta text-xs rounded"
                >
                  {noun}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* 대화 내용 */}
      <div className="border-t pt-4 max-h-64 overflow-y-auto space-y-4">
        {session.asr_segments.map((seg, idx) => {
          const isAgent = seg.speaker === "상담사";
          return (
            <div
              key={idx}
              className={`flex items-end ${
                isAgent ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`relative p-4 rounded-xl max-w-md break-words shadow-sm ${
                  isAgent
                    ? "bg-uplus-magenta text-white rounded-bl-[16px] rounded-tr-[16px]"
                    : "bg-gray-100 text-gray-800 rounded-br-[16px] rounded-tl-[16px]"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{seg.text}</p>
                <span
                  className={`block text-[10px] ${
                    isAgent ? "text-gray-200" : "text-gray-500"
                  } mt-1 text-right`}
                >
                  {seg.speaker}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
