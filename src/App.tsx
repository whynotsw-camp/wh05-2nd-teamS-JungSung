import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex items-center justify-center h-full text-uplus-navy font-text">
                대시보드 콘텐츠 영역
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
