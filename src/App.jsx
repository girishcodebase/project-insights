import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ContentPage from "./components/ContentPage";
import { sections } from "./sectionsConfig";
import "./App.css";

const defaultSection = sections[0];
const defaultSubsection = defaultSection.subsections[0];
const defaultPath = `/${defaultSection.id}/${defaultSubsection.id}`;

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app">
        <Header onToggleSidebar={() => setSidebarOpen((o) => !o)} />
        <div className="app-body">
          <Sidebar isOpen={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to={defaultPath} replace />} />
              <Route path="/:sectionId/:subsectionId" element={<ContentPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
