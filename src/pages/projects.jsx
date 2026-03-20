import { useState } from "react";
import { Archive, BookOpen } from "lucide-react";
import { projects, archivedProjects } from "../data/projectsData";
import DraggableSideNav from "../components/DraggableSideNav";

/* ── Docs Modal ── */
function DocsModal({ project, onClose }) {
  if (!project?.docs) return null;
  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 99999, padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff", border: "4px solid #000", borderRadius: 24,
          boxShadow: "12px 12px 0 #000", maxWidth: 560, width: "100%",
          maxHeight: "85vh", overflowY: "auto", padding: "32px 28px",
          fontFamily: "'Architects Daughter', cursive",
          position: "relative",
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 18, background: "none",
            border: "none", fontSize: 24, cursor: "pointer", lineHeight: 1,
          }}
          aria-label="Close"
        >&times;</button>

        <h2 style={{ color: "var(--green)", marginBottom: 6, fontSize: 26 }}>
          {project.title}
        </h2>
        <p style={{ fontSize: 14, marginBottom: 20, color: "#555" }}>
          {project.docs.overview}
        </p>

        <h3 style={{ fontSize: 16, color: "var(--green)", marginBottom: 8 }}>
          Features
        </h3>
        <ul style={{ paddingLeft: 18, marginBottom: 18, lineHeight: 1.9, fontSize: 14 }}>
          {project.docs.features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>

        <h3 style={{ fontSize: 16, color: "var(--green)", marginBottom: 8 }}>
          How to Use
        </h3>
        <ol style={{ paddingLeft: 18, marginBottom: 18, lineHeight: 1.9, fontSize: 14 }}>
          {project.docs.howToUse.map((step, i) => <li key={i}>{step}</li>)}
        </ol>

        <h3 style={{ fontSize: 16, color: "var(--green)", marginBottom: 6 }}>
          Tech Stack
        </h3>
        <p style={{ fontSize: 14, lineHeight: 1.6 }}>{project.docs.stack}</p>
      </div>
    </div>
  );
}

function Projects() {
  const [docsProject, setDocsProject] = useState(null);
  const [showArchive, setShowArchive] = useState(false);

  return (
    <section className="projects-page">
      {docsProject && (
        <DocsModal project={docsProject} onClose={() => setDocsProject(null)} />
      )}

      <div className="projects-title-card">
        <h1>My Projects</h1>
        <p>Stuff I built and experimented with.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={project.id || index} className={`project-card rotate-${index % 4}`}>
            {project.image ? (
              project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-image-link"
                >
                  <img src={project.image} alt={project.title} className="project-card-image" />
                </a>
              ) : (
                <img src={project.image} alt={project.title} className="project-card-image project-card-image-standalone" />
              )
            ) : (
              <div className="project-card-image-placeholder" aria-hidden="true">
                <span>{project.title.charAt(0)}</span>
              </div>
            )}

            <h2>{project.title}</h2>
            <p>{project.description}</p>

            <div className="project-tags">
              {project.tech.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Visit site →
                </a>
              )}
              {project.docs && (
                <button
                  onClick={() => setDocsProject(project)}
                  style={{
                    background: "none", border: "2px solid var(--border)",
                    borderRadius: 12, padding: "4px 14px",
                    fontFamily: "'Architects Daughter', cursive",
                    fontSize: 14, cursor: "pointer",
                    color: "var(--green)", boxShadow: "3px 3px 0 #000",
                    transition: "transform 0.15s ease",
                    display: "flex", alignItems: "center", gap: 6,
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  <BookOpen size={14} /> Docs
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ARCHIVE TOGGLE */}
      <div style={{ textAlign: "center", margin: "48px auto 0" }}>
        <button
          onClick={() => setShowArchive(v => !v)}
          style={{
            fontFamily: "'Architects Daughter', cursive",
            fontSize: 16, cursor: "pointer",
            background: "#fff", border: "3px solid #000",
            borderRadius: 16, padding: "12px 28px",
            boxShadow: "6px 6px 0 #000",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            color: "#1f1f1f",
            display: "inline-flex", alignItems: "center", gap: 8,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "rotate(-2deg) scale(1.05)"; e.currentTarget.style.boxShadow = "8px 8px 0 #000"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "6px 6px 0 #000"; }}
        >
          <Archive size={18} />
          {showArchive ? "Hide Archives" : "Previous Project Archives"}
        </button>
      </div>

      {/* ARCHIVE SECTION */}
      {showArchive && (
        <div style={{ maxWidth: 900, margin: "32px auto 0" }}>
          <div
            style={{
              textAlign: "center", marginBottom: 28, padding: "16px 24px",
              background: "#fef9c3", border: "3px solid #000", borderRadius: 18,
              boxShadow: "6px 6px 0 #000", transform: "rotate(-1deg)",
              fontFamily: "'Architects Daughter', cursive", fontSize: 15,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            }}
          >
            <Archive size={18} />
            These are older projects — rough around the edges, but important milestones!
          </div>

          <div className="projects-grid">
            {archivedProjects.map((project, index) => (
              <div
                key={project.id || index}
                className={`project-card rotate-${(index + 1) % 4}`}
                style={{ opacity: 0.88 }}
              >
                {project.image ? (
                  <img src={project.image} alt={project.title} className="project-card-image project-card-image-standalone" />
                ) : (
                  <div className="project-card-image-placeholder" aria-hidden="true">
                    <Archive size={24} />
                  </div>
                )}
                <div style={{
                  display: "inline-block", marginBottom: 8,
                  background: "#f0efe9", border: "2px solid #000", borderRadius: 10,
                  padding: "2px 10px", fontSize: 12,
                  fontFamily: "'Architects Daughter', cursive",
                }}>
                  {project.year}
                </div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tech.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Visit site →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="projects-future-note" style={{ marginTop: 48 }}>
        More projects coming soon — stay tuned :)
      </p>

      <DraggableSideNav />
    </section>
  );
}

export default Projects;
