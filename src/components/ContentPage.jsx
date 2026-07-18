import { useParams, Link } from "react-router-dom";
import { sections, flatSubsections } from "../sectionsConfig";

// Auto-discovers every src/assets/*.svg — topics reference one by filename.
const imageAssets = import.meta.glob("../assets/*.svg", {
  eager: true,
  import: "default",
});

function resolveImage(filename) {
  const entry = Object.entries(imageAssets).find(([path]) =>
    path.endsWith(`/${filename}`)
  );
  return entry?.[1];
}

function renderPoint(text) {
  const parts = text.split(/(\*\*`.*?`\*\*|\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**`") && part.endsWith("`**")) {
      return (
        <strong key={i}>
          <code>{part.slice(3, -3)}</code>
        </strong>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i}>{part.slice(1, -1)}</code>;
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
          {topic.image && (
            <img
              className="topic-image"
              src={resolveImage(topic.image)}
              alt={topic.imageAlt || topic.heading}
            />
          )}
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
            className="topic-nav-link topic-nav-prev"
            to={`/${prev.sectionId}/${prev.subsectionId}`}
          >
            ← {prev.subsectionTitle}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            className="topic-nav-link topic-nav-next"
            to={`/${next.sectionId}/${next.subsectionId}`}
          >
            {next.subsectionTitle} →
          </Link>
        )}
      </div>
    </div>
  );
}
