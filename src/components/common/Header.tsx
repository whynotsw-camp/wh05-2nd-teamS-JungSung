import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoSvg from "/images/logo.svg";
import {
  ArrowDownTrayIcon,
  ChevronDownIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const dateOptions = ["오늘", "이번 주", "이번 달"];
const channels = ["채팅", "전화", "전체"];

interface HeaderProps {
  onDateChange?: (dateKey: string) => void;
  onChannelChange?: (channel: string) => void;
  onMenuToggle?: () => void;
}

export function Header({
  onDateChange,
  onChannelChange,
  onMenuToggle,
}: HeaderProps) {
  const [dateMenuOpen, setDateMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dateOptions[0]);
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDateMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectDate = (option: string) => {
    setSelectedDate(option);
    setDateMenuOpen(false);
    onDateChange?.(option);
  };

  const selectChannel = (channel: string) => {
    setSelectedChannel(channel);
    onChannelChange?.(channel);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between bg-uplus-magenta px-6 shadow">
      {/* 좌측: 메뉴 토글, 로고 + 타이틀 */}
      <div
        className="flex items-center space-x-2 cursor-pointer group"
        onClick={() => navigate("/")}
      >
        <button
          className="md:hidden text-white"
          onClick={(e) => {
            e.stopPropagation();
            onMenuToggle?.();
          }}
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        <img
          src={logoSvg}
          className="w-16 h-8 object-contain fill-current text-white group-hover:text-uplus-accent transition-colors"
          alt="Feple 로고"
        />
        <h1 className="font-headline font-semibold text-white text-lg group-hover:text-uplus-accent transition-colors">
          Peple 대시보드
        </h1>
      </div>

      {/* 중앙: 날짜 드롭다운 + 채널 탭 (md 이상) */}
      <div className="hidden md:flex items-center gap-6">
        <div className="relative" ref={menuRef}>
          <button
            className="flex items-center space-x-1 bg-white text-uplus-magenta font-text px-4 py-2 rounded-lg shadow"
            onClick={() => setDateMenuOpen((open) => !open)}
          >
            <span>{selectedDate}</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>
          {dateMenuOpen && (
            <ul className="absolute z-10 mt-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden">
              {dateOptions.map((opt) => (
                <li
                  key={opt}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    opt === selectedDate ? "font-semibold" : ""
                  }`}
                  onClick={() => selectDate(opt)}
                >
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav className="flex bg-white rounded-lg overflow-hidden">
          {channels.map((ch) => (
            <button
              key={ch}
              className={`px-4 py-2 font-text text-sm ${
                ch === selectedChannel
                  ? "bg-uplus-navy-alt text-white"
                  : "text-uplus-navy"
              }`}
              onClick={() => selectChannel(ch)}
            >
              {ch}
            </button>
          ))}
        </nav>
      </div>

      {/* 우측: PDF 다운로드 */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center bg-white text-uplus-navy font-text px-4 py-2 rounded-lg shadow hover:bg-gray-50">
          <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
          <span>PDF 다운로드</span>
        </button>
      </div>
    </header>
  );
}
