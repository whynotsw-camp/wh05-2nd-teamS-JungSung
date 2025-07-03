import React, { useState, useContext } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { PrintRefContext } from "../../context/PrintRefContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const context = useContext(PrintRefContext);

  if (!context) {
    throw new Error("Layout must be used within a PrintRefProvider");
  }

  const { printRef } = context;

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

