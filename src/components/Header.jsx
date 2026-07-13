import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { flatSubsections } from "../sectionsConfig";

export default function Header({ onToggleSidebar, onAddContent }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  const query = search.trim().toLowerCase();
  const results = query
    ? flatSubsections.filter((item) =>
        item.subsectionTitle.toLowerCase().includes(query)
      )
    : [];

  function handleSelect(item) {
    setSearch("");
    setFocused(false);
    navigate(`/${item.sectionId}/${item.subsectionId}`);
  }

  return (
    <header className="app-header">
      <button
        className="sidebar-toggle-btn"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
      <Link to="/" className="header-brand">
        <h1>Project Insights</h1>
        <p>Quick reference notes for developers</p>
      </Link>
      <div className="header-search">
        <input
          type="text"
          placeholder="Quick Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
        />
        {focused && query && (
          <div className="header-search-results">
            {results.length === 0 && (
              <p className="header-search-no-results">No subsections found</p>
            )}
            {results.map((item) => (
              <button
                key={`${item.sectionId}-${item.subsectionId}`}
                className="header-search-result"
                onMouseDown={() => handleSelect(item)}
              >
                <span className="header-search-result-title">{item.subsectionTitle}</span>
                <span className="header-search-result-section">{item.sectionTitle}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        className="add-content-btn"
        onClick={onAddContent}
        aria-label="Add content"
      >
        +
      </button>
    </header>
  );
}
