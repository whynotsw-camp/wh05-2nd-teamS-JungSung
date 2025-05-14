// src/pages/Sessions.tsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSessionData } from "../hooks/useSessionData";
import SessionCard from "../components/SessionCard";
import { motion, AnimatePresence } from "framer-motion";

export default function Sessions() {
  const { loading, sessions } = useSessionData();
  const [selectedSession, setSelectedSession] = useState<
    (typeof sessions)[0] | null
  >(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // 초기 로드 시 첫 번째 세션 선택
  useEffect(() => {
    if (!loading && sessions.length) {
      setSelectedSession(sessions[0]);
    }
  }, [loading, sessions]);

  // 검색어 기반 필터링
  const filteredSessions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return sessions.filter((s) =>
      String(s.session_id).includes(searchTerm.trim())
    );
  }, [sessions, searchTerm]);

  // 선택 핸들러
  const handleSelect = useCallback((session: (typeof sessions)[0]) => {
    setSelectedSession(session);
    setSearchTerm("");
    setActiveIndex(-1);
  }, []);

  // 키보드 네비게이션
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredSessions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filteredSessions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filteredSessions.length) {
        handleSelect(filteredSessions[activeIndex]);
      }
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">상담 내역 로딩 중…</div>
    );
  }

  return (
    <motion.div
      className="p-6 space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* 세션 검색 & 선택 */}
      <div>
        <h3 className="text-base font-medium text-gray-700 mb-2">
          상담 선택하기
        </h3>
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="확인할 상담의 ID를 입력해주세요"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-uplus-magenta"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          {searchTerm && (
            <ul className="absolute z-10 bg-white border border-gray-200 w-full max-h-48 overflow-y-auto mt-1 rounded-md shadow-lg">
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session, idx) => (
                  <li key={String(session.session_id)}>
                    <button
                      className={`w-full text-left p-2 hover:bg-gray-100 ${
                        idx === activeIndex ? "bg-gray-100 font-medium" : ""
                      }`}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => handleSelect(session)}
                    >
                      {session.session_id}
                    </button>
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">일치하는 세션이 없습니다.</li>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* 선택된 세션 상세 (애니메이션 포함) */}
      <AnimatePresence mode="wait">
        {selectedSession ? (
          <motion.div
            key={String(selectedSession.session_id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-white rounded-xl shadow space-y-4"
          >
            <SessionCard session={selectedSession} />
          </motion.div>
        ) : (
          <motion.div
            key="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-center text-gray-500"
          >
            선택된 세션이 없습니다.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
