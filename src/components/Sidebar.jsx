import { useState } from "react";

export default function Sidebar({ notes, activeId, onSelect, isOpen, onToggle }) {
  const [search, setSearch] = useState("");

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "active" : ""}`} onClick={onToggle} />
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Topics</h2>
          <button className="close-btn" onClick={onToggle}>
            &times;
          </button>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <nav className="sidebar-nav">
          {filtered.map((note) => (
            <button
              key={note.id}
              className={`nav-item ${activeId === note.id ? "active" : ""}`}
              onClick={() => {
                onSelect(note.id);
                onToggle();
              }}
            >
              <span className="nav-icon">{note.icon}</span>
              <div className="nav-text">
                <span className="nav-title">{note.title}</span>
                <span className="nav-category">{note.category}</span>
              </div>
            </button>
          ))}
          {filtered.length === 0 && <p className="no-results">No topics found</p>}
        </nav>
      </aside>
    </>
  );
}
