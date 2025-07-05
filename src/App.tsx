import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Sessions from "./pages/Sessions";
import Politeness from "./pages/Politeness";
import Diary from "./pages/Diary";
import { PrintRefProvider } from "./context/PrintRefContext";
import { AnalysisResultProvider } from "./context/AnalysisResultContext";

export default function App() {
  return (
    <BrowserRouter>
      <AnalysisResultProvider>
        <PrintRefProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/politeness" element={<Politeness />} />
              <Route path="/diary" element={<Diary />} />
            </Routes>
          </Layout>
        </PrintRefProvider>
      </AnalysisResultProvider>
    </BrowserRouter>
  );
}
