import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Header onMenuToggle={() => setSidebarOpen((open) => !open)} />
      <Sidebar isOpen={sidebarOpen} />
      <main className="flex-1 p-6 pt-24 md:pl-64">{children}</main>
    </div>
  );
}
