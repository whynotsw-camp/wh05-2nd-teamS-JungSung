import { Link } from "react-router-dom";
import { useSessionData } from "../hooks/useSessionData";
import SessionCard from "../components/SessionCard";

export default function Sessions() {
  const { loading, sessions } = useSessionData();

  if (loading) {
    return <div className="py-20 text-center text-gray-500">세션 로딩 중…</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-headline">전체 세션 목록</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {sessions.map((s) => (
          <Link key={s.session_id} to={`/sessions/${s.session_id}`}>
            <SessionCard session={s} />
          </Link>
        ))}
      </div>
    </div>
  );
}
