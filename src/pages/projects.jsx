import { useState, useEffect, useRef } from "react";
import { Archive, BookOpen, ExternalLink, Code2, X } from "lucide-react";
import { projects, archivedProjects } from "../data/projectsData";
import DraggableSideNav from "../components/DraggableSideNav";
import gsap from "gsap";

/* ────────────────────────────────────────────────
   PROJECT BACKGROUND DOODLES
──────────────────────────────────────────────── */
const PROJ_BG = [
  { sx:"2%",  sy:"10%", r:-5,  s:28, o:0.09, d:6.0, dl:0,   shape:"bracket" },
  { sx:"95%", sy:"8%",  r: 5,  s:22, o:0.08, d:5.5, dl:1.2, shape:"bracket" },
  { sx:"5%",  sy:"35%", r:-8,  s:24, o:0.10, d:7.0, dl:0.8, shape:"bulb"    },
  { sx:"92%", sy:"40%", r:10,  s:20, o:0.08, d:6.5, dl:2.0, shape:"bulb"    },
  { sx:"4%",  sy:"65%", r:20,  s:22, o:0.09, d:5.8, dl:1.5, shape:"pencil"  },
  { sx:"93%", sy:"62%", r:-20, s:18, o:0.08, d:6.2, dl:0.5, shape:"pencil"  },
  { sx:"8%",  sy:"82%", r:30,  s:16, o:0.08, d:5.5, dl:0.3, shape:"star"    },
  { sx:"90%", sy:"80%", r:-15, s:20, o:0.09, d:6.8, dl:1.8, shape:"star"    },
  { sx:"48%", sy:"3%",  r:10,  s:14, o:0.07, d:5.2, dl:2.5, shape:"star"    },
  { sx:"3%",  sy:"50%", r: 0,  s:30, o:0.07, d:7.2, dl:1.0, shape:"wave"    },
  { sx:"88%", sy:"22%", r:-5,  s:26, o:0.06, d:6.5, dl:0.7, shape:"wave"    },
  { sx:"88%", sy:"92%", r: 0,  s:18, o:0.07, d:5.5, dl:2.2, shape:"circle"  },
  { sx:"7%",  sy:"95%", r: 0,  s:14, o:0.06, d:6.0, dl:1.3, shape:"circle"  },
  { sx:"2%",  sy:"22%", r: 0,  s:26, o:0.09, d:6.5, dl:0.4, shape:"terminal"},
  { sx:"90%", sy:"55%", r: 0,  s:22, o:0.08, d:7.0, dl:1.6, shape:"terminal"},
];

function ProjBgDoodle({ sx, sy, r, s, o, d, dl, shape }) {
  const style = {
    position:"fixed", left:sx, top:sy, opacity:o,
    transform:`rotate(${r}deg)`,
    animation:`proj-bg-float ${d}s ease-in-out ${dl}s infinite`,
    willChange:"transform", color:"#155d29", pointerEvents:"none",
  };
  const paths = {
    bracket:  <svg width={s} height={s*1.2} viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8,2 L4,2 L4,30 L8,30"/><path d="M16,2 L20,2 L20,30 L16,30"/></svg>,
    bulb:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21h6M12 3a6 6 0 0 1 4.243 10.243C15.4 14.1 15 15 15 16H9c0-1-.4-1.9-1.243-2.757A6 6 0 0 1 12 3z"/><line x1="12" y1="16" x2="12" y2="21"/></svg>,
    pencil:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
    star:     <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M10,2 L11.5,8.5 L18,10 L11.5,11.5 L10,18 L8.5,11.5 L2,10 L8.5,8.5 Z"/></svg>,
    wave:     <svg width={s} height={s*0.5} viewBox="0 0 40 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2,9 C6,3 12,15 18,9 C24,3 30,15 36,9 C38,7 39,8 40,9"/></svg>,
    circle:   <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10" cy="10" r="7"/></svg>,
    terminal: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  };
  return <div style={style}>{paths[shape]}</div>;
}

/* ────────────────────────────────────────────────
   DOCS MODAL
──────────────────────────────────────────────── */
function DocsModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const cardRef    = useRef(null);

  useEffect(() => {
    if (!project) return;
    gsap.fromTo(overlayRef.current, { opacity:0 }, { opacity:1, duration:0.22 });
    gsap.fromTo(cardRef.current,
      { opacity:0, scale:0.88, y:24 },
      { opacity:1, scale:1,    y: 0, duration:0.38, ease:"back.out(1.4)" }
    );
  }, [project]);

  const handleClose = () => {
    gsap.to(cardRef.current,    { opacity:0, scale:0.92, y:10, duration:0.2, ease:"power2.in", onComplete:onClose });
    gsap.to(overlayRef.current, { opacity:0, duration:0.2 });
  };

  useEffect(() => {
    const esc = e => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  if (!project?.docs) return null;

  return (
    <div
      ref={overlayRef}
      className="docs-modal-overlay"
      onClick={handleClose}
    >
      <div ref={cardRef} className="docs-modal-card" onClick={e => e.stopPropagation()}>
        <button onClick={handleClose} className="docs-modal-close" aria-label="Close">
          <X size={18} />
        </button>
        <h2 className="docs-modal-title">{project.title}</h2>
        <p className="docs-modal-overview">{project.docs.overview}</p>

        <h3 className="docs-modal-h3">Features</h3>
        <ul className="docs-modal-list">
          {project.docs.features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>

        <h3 className="docs-modal-h3">How to Use</h3>
        <ol className="docs-modal-list">
          {project.docs.howToUse.map((step, i) => <li key={i}>{step}</li>)}
        </ol>

        <h3 className="docs-modal-h3">Tech Stack</h3>
        <p className="docs-modal-overview">{project.docs.stack}</p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   HAND-DRAWN DIVIDER SVG
──────────────────────────────────────────────── */
function HandDrawnRule({ dashed = false }) {
  return (
    <div className="project-card-divider" aria-hidden="true">
      <svg viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          d="M0,4 C20,1 40,7 60,4 C80,1 100,7 120,4 C140,1 160,7 180,4 C190,2 196,3 200,4"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray={dashed ? "5 4" : "none"}
          fill="none"
        />
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────────
   PROJECT CARD — consistent layout, buttons at bottom
──────────────────────────────────────────────── */
function ProjectCard({ project, index, onDocs }) {
  return (
    <div className={`project-card project-card--consistent rotate-${index % 4}`} style={{ "--proj-i": index }}>

      {/* Image — fixed height */}
      {project.image ? (
        project.link ? (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card-image-link" tabIndex={-1}>
            <img src={project.image} alt={project.title} className="project-card-image" loading="lazy" />
          </a>
        ) : (
          <img src={project.image} alt={project.title} className="project-card-image project-card-image-standalone" loading="lazy" />
        )
      ) : (
        <div className="project-card-image-placeholder" aria-hidden="true">
          <Code2 size={36} />
        </div>
      )}

      {/* Body — grows to push actions down */}
      <div className="project-card-body">
        <h2 className="project-card-title">{project.title}</h2>
        <p className="project-card-desc">{project.description}</p>
      </div>

      {/* Divider 1: after description */}
      <HandDrawnRule />

      {/* Tags */}
      <div className="project-tags">
        {project.tech.map((tech, i) => <span key={i}>{tech}</span>)}
      </div>

      {/* Divider 2: before actions */}
      <HandDrawnRule dashed />

      {/* Actions — always at bottom */}
      <div className="project-card-actions">
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
            <ExternalLink size={13} />
            Visit site
          </a>
        )}
        {project.docs && (
          <button onClick={() => onDocs(project)} className="project-docs-btn" aria-label={`Docs for ${project.title}`}>
            <BookOpen size={14} />
            Docs
          </button>
        )}
      </div>

    </div>
  );
}

/* ────────────────────────────────────────────────
   ARCHIVE CARD
──────────────────────────────────────────────── */
function ArchiveCard({ project, index }) {
  return (
    <div className={`project-card project-card--consistent rotate-${(index + 1) % 4}`} style={{ opacity:0.88 }}>
      {project.image ? (
        <img src={project.image} alt={project.title} className="project-card-image project-card-image-standalone" loading="lazy" />
      ) : (
        <div className="project-card-image-placeholder" aria-hidden="true">
          <Archive size={24} />
        </div>
      )}
      {project.year && <div className="project-archive-year">{project.year}</div>}

      <div className="project-card-body">
        <h2 className="project-card-title">{project.title}</h2>
        <p className="project-card-desc">{project.description}</p>
      </div>

      <HandDrawnRule />

      <div className="project-tags">
        {project.tech.map((tech, i) => <span key={i}>{tech}</span>)}
      </div>

      {project.link && (
        <>
          <HandDrawnRule dashed />
          <div className="project-card-actions">
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
              <ExternalLink size={13} />
              Visit site
            </a>
          </div>
        </>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────
   MAIN PROJECTS PAGE
──────────────────────────────────────────────── */
export default function Projects() {
  const [docsProject, setDocsProject] = useState(null);
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-title-card", {
        opacity:0, scale:0.88, y:20, duration:0.55, delay:0.1, ease:"back.out(1.4)",
      });
      gsap.from(".project-card", {
        opacity:0, y:30, scale:0.92, stagger:0.1, duration:0.5, delay:0.3, ease:"back.out(1.3)",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="projects-page">

      {/* Background doodles */}
      <div className="projects-doodle-layer" aria-hidden="true">
        <style>{`
          @keyframes proj-bg-float {
            0%,100% { transform:translateY(0)   rotate(var(--pdbr,0deg)); }
            50%      { transform:translateY(-8px) rotate(var(--pdbr,0deg)); }
          }
        `}</style>
        {PROJ_BG.map((d, i) => <ProjBgDoodle key={i} {...d} />)}
      </div>

      {docsProject && <DocsModal project={docsProject} onClose={() => setDocsProject(null)} />}

      <div className="projects-title-card">
        <h1>My Projects</h1>
        <p>Stuff I built and experimented with.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id || index} project={project} index={index} onDocs={setDocsProject} />
        ))}
      </div>

      <div style={{ textAlign:"center", margin:"48px auto 0" }}>
        <button onClick={() => setShowArchive(v => !v)} className="project-archive-btn">
          <Archive size={18} />
          {showArchive ? "Hide Archives" : "Previous Project Archives"}
        </button>
      </div>

      {showArchive && (
        <div style={{ maxWidth:900, margin:"32px auto 0" }}>
          <div className="project-archive-banner">
            <Archive size={18} />
            Older projects — rough around the edges, but important milestones!
          </div>
          <div className="projects-grid">
            {archivedProjects.map((project, index) => (
              <ArchiveCard key={project.id || index} project={project} index={index} />
            ))}
          </div>
        </div>
      )}

      <p className="projects-future-note" style={{ marginTop:48 }}>
        More projects coming soon — stay tuned :)
      </p>

      <DraggableSideNav />
    </section>
  );
}
