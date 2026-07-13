export default function NoteCard({ note }) {
  const renderPoint = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="note-content">
      <div className="note-header" style={{ borderColor: note.color }}>
        <span className="note-icon">{note.icon}</span>
        <div>
          <h1>{note.title}</h1>
          <span className="note-badge" style={{ backgroundColor: note.color }}>
            {note.category}
          </span>
        </div>
      </div>

      <div className="topics-grid">
        {note.topics.map((topic, idx) => (
          <div className="topic-card" key={idx}>
            <h3 className="topic-heading" style={{ color: note.color }}>
              {topic.heading}
            </h3>
            <ul className="topic-points">
              {topic.points.map((point, pIdx) => (
                <li key={pIdx}>{renderPoint(point)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
