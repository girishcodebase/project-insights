import sectionsMeta from "./sections.json";
import java from "./pages/java/data.json";
import springboot from "./pages/springboot/data.json";
import database from "./pages/database/data.json";
import microservices from "./pages/microservices/data.json";
import designpatterns from "./pages/designpatterns/data.json";
import systemdesign from "./pages/systemdesign/data.json";
import devops from "./pages/devops/data.json";
import testing from "./pages/testing/data.json";

const subsectionsById = {
  java,
  springboot,
  database,
  microservices,
  designpatterns,
  systemdesign,
  devops,
  testing,
};

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
