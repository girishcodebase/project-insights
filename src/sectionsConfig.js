import sectionsMeta from "./sections.json";

// Auto-discovers every src/pages/<id>/data.json at build time — no
// manual import needed when a new main section is added.
const dataModules = import.meta.glob("./pages/*/data.json", {
  eager: true,
  import: "default",
});

const subsectionsById = Object.fromEntries(
  Object.entries(dataModules).map(([path, data]) => {
    const [, id] = path.match(/\.\/pages\/([^/]+)\/data\.json$/);
    return [id, data];
  })
);

export const sections = sectionsMeta.map((meta) => ({
  ...meta,
  subsections: subsectionsById[meta.id] || [],
}));

// Flat, ordered list of every subsection across all sections, used to
// resolve "previous" / "next" navigation across section boundaries.
export const flatSubsections = sections.flatMap((section) =>
  section.subsections.map((sub) => ({
    sectionId: section.id,
    sectionTitle: section.title,
    subsectionId: sub.id,
    subsectionTitle: sub.title,
  }))
);
