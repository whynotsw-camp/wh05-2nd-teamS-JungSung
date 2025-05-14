import { SessionRecord } from "../hooks/useSessionData";

interface SessionCardProps {
  session: SessionRecord;
  showDetail?: boolean;
}

export default function SessionCard({
  session,
  showDetail = false,
}: SessionCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition-shadow">
      <h4 className="font-medium mb-2">세션 ID: {session.session_id}</h4>
      <p>고객 감정 점수: {session.고객_sent_score.toFixed(2)}</p>
      <p>상담사 감정 점수: {session.상담사_sent_score.toFixed(2)}</p>
      <p>스크립트 준수율: {(session.script_phrase_ratio * 100).toFixed(1)}%</p>
      <p>갈등 여부: {session.conflict_flag ? "O" : "X"}</p>
      {showDetail && (
        <p>대안 제시 횟수: {session.alternative_suggestion_count}</p>
      )}
    </div>
  );
}
