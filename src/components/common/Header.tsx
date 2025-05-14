import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import logoSvg from "/images/logo.svg";
import { ArrowDownTrayIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

const dateOptions = ["오늘", "이번 주", "이번 달"];

interface HeaderProps {
  onDateChange?: (dateKey: string) => void;
  onChannelChange?: (channel: string) => void;
  onMenuToggle?: () => void;
  printRef: React.RefObject<HTMLDivElement | null>;
}

export function Header({ onDateChange, onMenuToggle, printRef }: HeaderProps) {
  const [dateMenuOpen, setDateMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dateOptions[0]);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDateMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectDate = (opt: string) => {
    setSelectedDate(opt);
    onDateChange?.(opt);
  };

  const handleDownload = async () => {
    if (!printRef.current) return;
    const el = printRef.current;
    const w = el.scrollWidth;
    const h = el.scrollHeight;
    const canvas = await html2canvas(el, {
      scale: 2,
      windowWidth: w,
      windowHeight: h,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      useCORS: true,
    });
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(img, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`dashboard_${new Date().toISOString()}.pdf`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between bg-uplus-magenta px-6 shadow">
      {/* 좌측: 메뉴 & 로고 */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
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
        <img src={logoSvg} className="w-16 h-8 object-contain" alt="로고" />
        <h1 className="font-headline font-semibold text-white text-lg">
          Peple 대시보드
        </h1>
      </div>

      {/* 중앙: 날짜 토글 (홈일 때만 표시) */}
      <AnimatePresence>
        {pathname === "/" && (
          <motion.div
            key="date-toggle"
            className="hidden md:flex items-center space-x-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {dateOptions.map((opt) => {
              const isActive = selectedDate === opt;
              return (
                <button
                  key={opt}
                  onClick={() => selectDate(opt)}
                  className={`
                    px-4 py-2 rounded-lg font-text text-sm
                    transition
                    ${
                      isActive
                        ? "bg-white text-uplus-magenta shadow"
                        : "bg-uplus-magenta bg-opacity-30 text-white hover:bg-opacity-40"
                    }
                  `}
                >
                  {opt}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 우측: PDF 버튼 (홈에서만) */}
      <div className="flex items-center">
        <AnimatePresence>
          {pathname === "/" && (
            <motion.button
              key="pdf-btn"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              onClick={handleDownload}
              className="flex items-center bg-white text-uplus-magenta font-text px-4 py-2 rounded-lg shadow hover:bg-gray-50"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              <span>PDF로 다운로드</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
