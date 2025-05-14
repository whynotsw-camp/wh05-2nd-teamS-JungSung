import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import Dashboard from "./pages/Dashboard";
import Sessions from "./pages/Sessions";
import Politeness from "./pages/Politeness";

export default function App() {
  return (
    <BrowserRouter basename="/Feple">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/politeness" element={<Politeness />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
