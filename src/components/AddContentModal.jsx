import { useState } from "react";
import { sections } from "../sectionsConfig";
import { getJsonFile, putJsonFile } from "../github";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const emptyTopic = { heading: "", points: "" };
const TOKEN_STORAGE_KEY = "project-insights-github-token";

export default function AddContentModal({ onClose }) {
  const [mode, setMode] = useState("subsection");
  const [sectionId, setSectionId] = useState(sections[0].id);
  const [existingSubsectionId, setExistingSubsectionId] = useState(
    sections[0].subsections[0]?.id || ""
  );
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionColor, setNewSectionColor] = useState("#607d8b");
  const [subsectionTitle, setSubsectionTitle] = useState("");
  const [topics, setTopics] = useState([{ ...emptyTopic }]);

  const currentSection = sections.find((s) => s.id === sectionId);

  function handleSectionChange(id) {
    setSectionId(id);
    const section = sections.find((s) => s.id === id);
    setExistingSubsectionId(section?.subsections[0]?.id || "");
  }
  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_STORAGE_KEY) || ""
  );
  const [rememberToken, setRememberToken] = useState(
    () => !!localStorage.getItem(TOKEN_STORAGE_KEY)
  );
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  function handleTokenChange(value) {
    setToken(value);
    if (rememberToken) localStorage.setItem(TOKEN_STORAGE_KEY, value);
  }

  function handleRememberChange(checked) {
    setRememberToken(checked);
    if (checked) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }

  function updateTopic(idx, field, value) {
    setTopics((prev) =>
      prev.map((t, i) => (i === idx ? { ...t, [field]: value } : t))
    );
  }

  function addTopic() {
    setTopics((prev) => [...prev, { ...emptyTopic }]);
  }

  function removeTopic(idx) {
    setTopics((prev) => prev.filter((_, i) => i !== idx));
  }

  function buildTopics() {
    return topics
      .filter((t) => t.heading.trim() && t.points.trim())
      .map((t) => ({
        heading: t.heading.trim(),
        points: t.points
          .split("\n")
          .map((p) => p.trim())
          .filter(Boolean),
      }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);

    if (!token.trim()) {
      setStatus({ type: "error", text: "GitHub token is required." });
      return;
    }
    if (mode !== "existing" && !subsectionTitle.trim()) {
      setStatus({ type: "error", text: "Subsection title is required." });
      return;
    }

    const newTopics = buildTopics();
    if (newTopics.length === 0) {
      setStatus({
        type: "error",
        text: "Add at least one topic with a heading and points.",
      });
      return;
    }
    const newSubsection = { id: slugify(subsectionTitle), title: subsectionTitle.trim(), topics: newTopics };

    setBusy(true);
    try {
      if (mode === "existing") {
        const path = `src/pages/${sectionId}/data.json`;
        const { json, sha } = await getJsonFile(path, token);
        const target = json.find((sub) => sub.id === existingSubsectionId);
        if (!target) throw new Error("Selected subsection not found.");
        target.topics.push(...newTopics);
        await putJsonFile(
          path,
          token,
          json,
          sha,
          `Add topics to "${target.title}" in ${sectionId}`
        );
      } else if (mode === "subsection") {
        const path = `src/pages/${sectionId}/data.json`;
        const { json, sha } = await getJsonFile(path, token);
        json.push(newSubsection);
        await putJsonFile(
          path,
          token,
          json,
          sha,
          `Add subsection "${newSubsection.title}" to ${sectionId}`
        );
      } else {
        const newId = slugify(newSectionTitle);
        if (!newId) throw new Error("Main section title is required.");

        await putJsonFile(
          `src/pages/${newId}/data.json`,
          token,
          [newSubsection],
          null,
          `Add data for new section "${newSectionTitle}"`
        );

        const metaPath = "src/sections.json";
        const { json: meta, sha: metaSha } = await getJsonFile(
          metaPath,
          token
        );
        meta.push({
          id: newId,
          title: newSectionTitle.trim(),
          color: newSectionColor,
        });
        await putJsonFile(
          metaPath,
          token,
          meta,
          metaSha,
          `Add new section "${newSectionTitle}"`
        );
      }

      setStatus({
        type: "success",
        text: "Committed! The site will redeploy automatically in about a minute.",
      });
      setSubsectionTitle("");
      setTopics([{ ...emptyTopic }]);
      setNewSectionTitle("");
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Content</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <label className="modal-mode-select">
          Action
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="existing">Add to Existing Subsection</option>
            <option value="subsection">New Subsection</option>
            <option value="section">New Main Section</option>
          </select>
        </label>

        <form className="modal-form" onSubmit={handleSubmit}>
          {mode !== "section" ? (
            <label>
              Main Section
              <select
                value={sectionId}
                onChange={(e) => handleSectionChange(e.target.value)}
              >
                {sections.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <>
              <label>
                New Main Section Title
                <input
                  type="text"
                  placeholder="e.g. Cloud Computing"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                />
              </label>
              <label>
                Accent Color
                <input
                  type="color"
                  value={newSectionColor}
                  onChange={(e) => setNewSectionColor(e.target.value)}
                />
              </label>
            </>
          )}

          {mode === "existing" ? (
            <label>
              Subsection
              <select
                value={existingSubsectionId}
                onChange={(e) => setExistingSubsectionId(e.target.value)}
              >
                {currentSection?.subsections.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.title}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label>
              Subsection Title
              <input
                type="text"
                placeholder="e.g. Caching Basics"
                value={subsectionTitle}
                onChange={(e) => setSubsectionTitle(e.target.value)}
              />
            </label>
          )}

          {topics.map((topic, idx) => (
            <div className="modal-topic-block" key={idx}>
              <label>
                Topic Heading
                <input
                  type="text"
                  placeholder="e.g. Cache Eviction"
                  value={topic.heading}
                  onChange={(e) => updateTopic(idx, "heading", e.target.value)}
                />
              </label>
              <label>
                Points (one per line, use **term** for bold)
                <textarea
                  rows={4}
                  placeholder={"**LRU** — Evicts least recently used entry.\n**LFU** — Evicts least frequently used entry."}
                  value={topic.points}
                  onChange={(e) => updateTopic(idx, "points", e.target.value)}
                />
              </label>
              {topics.length > 1 && (
                <button
                  type="button"
                  className="modal-remove-topic-btn"
                  onClick={() => removeTopic(idx)}
                >
                  Remove topic
                </button>
              )}
            </div>
          ))}
          <button type="button" className="modal-add-topic-btn" onClick={addTopic}>
            + Add another topic
          </button>

          <label>
            GitHub Personal Access Token
            <input
              type="password"
              placeholder="ghp_..."
              value={token}
              onChange={(e) => handleTokenChange(e.target.value)}
            />
          </label>
          <label className="modal-checkbox-label">
            <input
              type="checkbox"
              checked={rememberToken}
              onChange={(e) => handleRememberChange(e.target.checked)}
            />
            Remember token on this device
          </label>
          <p className="modal-hint">
            Needs write access to this repo.{" "}
            {rememberToken
              ? "Saved in this browser's local storage only — never in the site's code."
              : "Not saved anywhere — you'll re-enter it next time."}
          </p>

          {status && (
            <p className={`modal-status modal-status-${status.type}`}>
              {status.text}
            </p>
          )}

          <button type="submit" className="modal-submit-btn" disabled={busy}>
            {busy ? "Committing..." : "Commit to GitHub"}
          </button>
        </form>
      </div>
    </div>
  );
}
