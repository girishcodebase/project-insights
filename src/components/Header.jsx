export default function Header({ onMenuClick }) {
  return (
    <header className="app-header">
      <button className="menu-btn" onClick={onMenuClick}>
        <span />
        <span />
        <span />
      </button>
      <div className="header-brand">
        <h1>Project Insights</h1>
        <p>Quick reference notes for developers</p>
      </div>
    </header>
  );
}
