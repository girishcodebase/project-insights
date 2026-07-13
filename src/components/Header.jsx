import { Link } from "react-router-dom";

export default function Header({ onToggleSidebar }) {
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
    </header>
  );
}
