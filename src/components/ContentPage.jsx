import { useParams, Link } from "react-router-dom";
import { sections, flatSubsections } from "../sectionsConfig";

function renderPoint(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ContentPage() {
  const { sectionId, subsectionId } = useParams();
  const section = sections.find((s) => s.id === sectionId) || sections[0];
  const subsection =
    section.subsections.find((sub) => sub.id === subsectionId) ||
    section.subsections[0];

  const currentIndex = flatSubsections.findIndex(
    (item) => item.sectionId === section.id && item.subsectionId === subsection.id
  );
  const prev = currentIndex > 0 ? flatSubsections[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < flatSubsections.length - 1
      ? flatSubsections[currentIndex + 1]
      : null;

  return (
    <div className="page-container">
      <h1 className="page-title" style={{ color: section.color }}>
        {subsection.title}
      </h1>
      {subsection.topics.map((topic, idx) => (
        <div className="topic-block" key={idx}>
          <h3 className="topic-heading" style={{ color: section.color }}>
            {topic.heading}
          </h3>
          <ul className="topic-points">
            {topic.points.map((point, pIdx) => (
              <li key={pIdx}>{renderPoint(point)}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="topic-nav">
        {prev ? (
          <Link
            className="topic-nav-btn topic-nav-prev"
            to={`/${prev.sectionId}/${prev.subsectionId}`}
          >
            <span className="topic-nav-label">← Previous</span>
            <span className="topic-nav-title">{prev.subsectionTitle}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            className="topic-nav-btn topic-nav-next"
            to={`/${next.sectionId}/${next.subsectionId}`}
          >
            <span className="topic-nav-label">Next →</span>
            <span className="topic-nav-title">{next.subsectionTitle}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
