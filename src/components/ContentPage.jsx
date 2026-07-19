import { useParams, Link } from "react-router-dom";
import { sections, flatSubsections } from "../sectionsConfig";
import MermaidDiagram from "./MermaidDiagram";

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

const CALLOUT_META = {
  tip: { icon: "💡", title: "Interview Tip", className: "callout-tip" },
  mistake: { icon: "⚠", title: "Common Mistake", className: "callout-mistake" },
  practice: { icon: "✅", title: "Best Practice", className: "callout-practice" },
  remember: { icon: "🧠", title: "Remember", className: "callout-remember" },
  performance: { icon: "🚀", title: "Performance Tip", className: "callout-performance" },
};

function CalloutList({ type, points }) {
  if (!points?.length) return null;
  const meta = CALLOUT_META[type];
  return points.map((point, i) => (
    <div className={`callout ${meta.className}`} key={i}>
      <span className="callout-icon">{meta.icon}</span>
      <div className="callout-body">
        {i === 0 && <span className="callout-title">{meta.title}</span>}
        {renderPoint(point)}
      </div>
    </div>
  ));
}

function ComparisonTable({ table }) {
  return (
    <div className="comparison-table-wrap">
      <table className="comparison-table">
        {table.title && <caption>{table.title}</caption>}
        <thead>
          <tr>
            {table.columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{renderPoint(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CodeExample({ example }) {
  return (
    <div className="code-example">
      {example.scenario && <div className="code-example-scenario">{example.scenario}</div>}
      {example.code && <pre className="code-example-code">{example.code}</pre>}
      {(example.input || example.execution || example.output) && (
        <div className="code-example-io">
          {example.input && (
            <>
              <span className="code-example-io-label">Input</span>
              <span className="code-example-io-value">{renderPoint(example.input)}</span>
            </>
          )}
          {example.execution && (
            <>
              <span className="code-example-io-label">Execution</span>
              <span className="code-example-io-value">{renderPoint(example.execution)}</span>
            </>
          )}
          {example.output && (
            <>
              <span className="code-example-io-label">Output</span>
              <span className="code-example-io-value">{renderPoint(example.output)}</span>
            </>
          )}
        </div>
      )}
      {example.explanation && (
        <div className="code-example-explanation">{renderPoint(example.explanation)}</div>
      )}
    </div>
  );
}

function RichSection({ heading, children }) {
  if (!children) return null;
  return (
    <section className="rich-section">
      {heading && <h2 className="rich-section-heading">{heading}</h2>}
      {children}
      <hr className="rich-divider" />
    </section>
  );
}

function PointList(points) {
  if (!points?.length) return null;
  return (
    <ul className="rich-list">
      {points.map((point, i) => (
        <li key={i}>{renderPoint(point)}</li>
      ))}
    </ul>
  );
}

function RichTopicPage({ subsection, section }) {
  const rich = subsection;
  return (
    <div className="rich-page">
      <p className="rich-kicker">{section.title}</p>
      <h1 className="page-title" style={{ color: section.color }}>
        {rich.title}
      </h1>

      <RichSection heading="Overview">
        {rich.overview?.map((p, i) => (
          <p className="rich-text" key={i}>
            {renderPoint(p)}
          </p>
        ))}
      </RichSection>

      <RichSection heading="Why Do We Need It?">{PointList(rich.why)}</RichSection>

      <RichSection heading="Problem It Solves">{PointList(rich.problem)}</RichSection>

      {rich.internalWorking && (
        <RichSection heading="Internal Working">
          {rich.internalWorking.intro && PointList(rich.internalWorking.intro)}
          {rich.internalWorking.topics?.map((topic, idx) => (
            <div className="rich-subtopic" key={idx}>
              <h3 className="rich-subtopic-heading" style={{ color: section.color }}>
                {topic.heading}
              </h3>
              {topic.image && (
                <img
                  className="topic-image"
                  src={resolveImage(topic.image)}
                  alt={topic.imageAlt || topic.heading}
                />
              )}
              {PointList(topic.points)}
            </div>
          ))}
        </RichSection>
      )}

      {rich.architectureFlow && (
        <RichSection heading="Architecture Flow">
          <MermaidDiagram
            chart={rich.architectureFlow.mermaid}
            caption={rich.architectureFlow.caption}
          />
        </RichSection>
      )}

      {rich.simpleExample && (
        <RichSection heading="Simple Example">
          <CodeExample example={rich.simpleExample} />
        </RichSection>
      )}

      {rich.realWorldExample && (
        <RichSection heading="Real-World Example">
          <CodeExample example={rich.realWorldExample} />
        </RichSection>
      )}

      {rich.comparisonTables?.length > 0 && (
        <RichSection heading="Comparison">
          {rich.comparisonTables.map((table, i) => (
            <ComparisonTable table={table} key={i} />
          ))}
        </RichSection>
      )}

      {(rich.bestPractices || rich.commonMistakes || rich.interviewTips || rich.remember || rich.performanceTips) && (
        <RichSection heading="Best Practices & Common Mistakes">
          <CalloutList type="practice" points={rich.bestPractices} />
          <CalloutList type="mistake" points={rich.commonMistakes} />
          <CalloutList type="performance" points={rich.performanceTips} />
          <CalloutList type="tip" points={rich.interviewTips} />
          <CalloutList type="remember" points={rich.remember} />
        </RichSection>
      )}

      {rich.faq?.length > 0 && (
        <RichSection heading="Frequently Asked Questions">
          {rich.faq.map((item, i) => (
            <div className="faq-item" key={i}>
              <div className="faq-question">Q: {item.q}</div>
              <div className="faq-answer">{renderPoint(item.a)}</div>
            </div>
          ))}
        </RichSection>
      )}

      <RichSection heading="Summary">
        {rich.summary?.map((p, i) => (
          <p className="rich-text" key={i}>
            {renderPoint(p)}
          </p>
        ))}
      </RichSection>

      {rich.quickRevision?.length > 0 && (
        <RichSection heading="Quick Revision">
          <div className="quick-revision">
            <div className="quick-revision-heading">Key Points</div>
            {PointList(rich.quickRevision)}
          </div>
        </RichSection>
      )}

      {rich.interviewQuestions && (
        <RichSection heading="Interview Questions">
          {["beginner", "intermediate", "advanced"].map(
            (level) =>
              rich.interviewQuestions[level]?.length > 0 && (
                <div className="interview-questions-level" key={level}>
                  <span className={`interview-level-badge interview-level-${level}`}>
                    {level}
                  </span>
                  {PointList(rich.interviewQuestions[level])}
                </div>
              )
          )}
        </RichSection>
      )}
    </div>
  );
}

function ClassicTopicPage({ subsection, section }) {
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
    </div>
  );
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

  const isRich = Boolean(subsection.overview);

  return (
    <div className="page-container">
      {isRich ? (
        <RichTopicPage subsection={subsection} section={section} />
      ) : (
        <ClassicTopicPage subsection={subsection} section={section} />
      )}
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
