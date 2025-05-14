import React, { useState, useRef } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // PDF 캡처할 영역 레퍼런스 생성
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Header
        onMenuToggle={() => setSidebarOpen((open) => !open)}
        printRef={printRef}
      />
      <Sidebar isOpen={sidebarOpen} />
      <main className="flex-1 pt-16 md:pl-64">{children}</main>
    </div>
  );
}
