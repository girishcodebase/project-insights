import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { sections } from "../sectionsConfig";

export default function Sidebar({ isOpen, onNavigate }) {
  const location = useLocation();
  const sectionId = location.pathname.split("/")[1];
  const [openSection, setOpenSection] = useState(sectionId || sections[0].id);

  if (!isOpen) return null;

  return (
    <>
      <div className="sidebar-backdrop" onClick={onNavigate} />
      <aside className="sidebar">
        <nav className="sidebar-nav">
          {sections.map((section) => {
            const isSectionOpen = openSection === section.id;
            return (
              <div className="sidebar-group" key={section.id}>
                <button
                  className="sidebar-section-btn"
                  style={{ borderLeftColor: section.color }}
                  onClick={() => setOpenSection(isSectionOpen ? null : section.id)}
                >
                  <span className="sidebar-title">{section.title}</span>
                  <span className={`sidebar-caret ${isSectionOpen ? "open" : ""}`}>›</span>
                </button>
                {isSectionOpen && (
                  <div className="sidebar-subsections">
                    {section.subsections.map((sub) => (
                      <NavLink
                        key={sub.id}
                        to={`/${section.id}/${sub.id}`}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                          `sidebar-subsection-link ${isActive ? "active" : ""}`
                        }
                      >
                        {sub.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
