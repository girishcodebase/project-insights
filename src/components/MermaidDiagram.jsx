import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",
  securityLevel: "strict",
  fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
});

let renderCount = 0;

export default function MermaidDiagram({ chart, caption }) {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const id = `mermaid-diagram-${renderCount++}`;

    mermaid
      .render(id, chart.trim())
      .then(({ svg }) => {
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return <div className="mermaid-error">Diagram failed to render: {error}</div>;
  }

  return (
    <div className="mermaid-diagram-wrap">
      <div className="mermaid-diagram" ref={containerRef} />
      {caption && <p className="mermaid-caption">{caption}</p>}
    </div>
  );
}
