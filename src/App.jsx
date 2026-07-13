import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ContentPage from "./components/ContentPage";
import "./App.css";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="app">
        <Header onToggleSidebar={() => setSidebarOpen((o) => !o)} />
        <div className="app-body">
          <Sidebar isOpen={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<ContentPage />} />
              <Route path="/:sectionId/:subsectionId" element={<ContentPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
