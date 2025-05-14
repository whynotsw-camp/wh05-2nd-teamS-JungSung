import { useParams, Link } from "react-router-dom";
import { useSessionData } from "../hooks/useSessionData";
import SessionCard from "../components/SessionCard";
import { SessionTimeline } from "../components/SessionTimeline";

export default function SessionDetail() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { loading, sessions } = useSessionData();

  if (loading) {
    return <div className="py-20 text-center text-gray-500">로딩 중…</div>;
  }

  // 이제 session_id 가 string 이므로 바로 매칭 가능
  const session = sessions.find((s) => s.session_id === sessionId);

  if (!session) {
    return (
      <div className="py-20 text-center text-gray-500">
        세션을 찾을 수가 없어요.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Link to="/sessions" className="text-uplus-magenta">
        &larr; 뒤로
      </Link>
      <h2 className="text-2xl font-headline">세션 #{sessionId} 상세</h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <SessionCard session={session} showDetail />
      </div>

      <div className="bg-white rounded-xl p-5 shadow">
        <h3 className="font-medium mb-3">타임라인 뷰</h3>
        <SessionTimeline segments={session.asr_segments} />
      </div>
    </div>
  );
}
