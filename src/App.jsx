import { useState } from "react";
import notes from "./data/notes";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NoteCard from "./components/NoteCard";
import "./App.css";

export default function App() {
  const [activeId, setActiveId] = useState(notes[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeNote = notes.find((n) => n.id === activeId);

  return (
    <div className="app">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="app-body">
        <Sidebar
          notes={notes}
          activeId={activeId}
          onSelect={setActiveId}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(false)}
        />
        <main className="main-content">
          <div className="topic-chips">
            {notes.map((n) => (
              <button
                key={n.id}
                className={`chip ${activeId === n.id ? "active" : ""}`}
                style={activeId === n.id ? { backgroundColor: n.color, color: "#fff" } : {}}
                onClick={() => setActiveId(n.id)}
              >
                {n.icon} {n.category}
              </button>
            ))}
          </div>
          {activeNote && <NoteCard note={activeNote} />}
        </main>
      </div>
    </div>
  );
}
