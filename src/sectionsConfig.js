import { subsections as java } from "./pages/java/data";
import { subsections as springboot } from "./pages/springboot/data";
import { subsections as database } from "./pages/database/data";
import { subsections as microservices } from "./pages/microservices/data";
import { subsections as designpatterns } from "./pages/designpatterns/data";
import { subsections as systemdesign } from "./pages/systemdesign/data";
import { subsections as devops } from "./pages/devops/data";
import { subsections as testing } from "./pages/testing/data";

export const sections = [
  { id: "java", title: "Java", color: "#e76f00", subsections: java },
  { id: "springboot", title: "Spring Boot", color: "#6db33f", subsections: springboot },
  { id: "database", title: "Database & SQL", color: "#336791", subsections: database },
  { id: "microservices", title: "Microservices", color: "#ff6b6b", subsections: microservices },
  { id: "designpatterns", title: "Design Patterns", color: "#9b59b6", subsections: designpatterns },
  { id: "systemdesign", title: "System Design", color: "#e67e22", subsections: systemdesign },
  { id: "devops", title: "DevOps", color: "#2ecc71", subsections: devops },
  { id: "testing", title: "Testing", color: "#1abc9c", subsections: testing },
];

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
