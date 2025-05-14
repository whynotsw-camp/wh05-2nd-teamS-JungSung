import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  printRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

export default function Layout({ printRef, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Header
        onMenuToggle={() => setSidebarOpen((o) => !o)}
        printRef={printRef}
      />
      <Sidebar isOpen={sidebarOpen} />
      <main className="flex-1 pt-16 md:pl-64">
        {/* PDF 캡처 대상 영역 */}
        <div ref={printRef}>{children}</div>
      </main>
    </div>
  );
}
