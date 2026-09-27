import { ExternalLink, Github, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import PageShell from "../components/PageShell";
import { archivedProjects, projects } from "../data/projectsData";

const folderColors = ["folder-yellow", "folder-blue", "folder-red", "folder-green"];

export default function Projects() {
  const [active, setActive] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    const previousFocus = document.activeElement;
    dialogRef.current?.focus();
    gsap.fromTo(".project-sheet", { opacity: 0, y: 34, rotate: -1 }, { opacity: 1, y: 0, rotate: 0, duration: 0.35, ease: "back.out(1.25)" });
    const close = (event) => event.key === "Escape" && setActive(null);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("keydown", close);
      previousFocus?.focus?.();
    };
  }, [active]);

  return (
    <PageShell pageClass="projects-v2" label="Projects">
      <header className="page-heading" data-reveal>
        <h1>Project Folders</h1>
        <p>Open a folder to see the problem, process, and result behind each build.</p>
      </header>

      <div className="projects-layout">
        <section className="folder-grid" aria-label="Project folders">
          {projects.map((project, index) => (
            <button
              type="button"
              className={`project-folder ${folderColors[index % folderColors.length]}`}
              key={project.id}
              onClick={() => setActive(project)}
              data-reveal
            >
              <span className="folder-label">{project.title}</span>
              <img src={project.image} alt="" />
              <span className="folder-tech">{project.tech.slice(0, 3).join(" · ")}</span>
              <strong>Open folder →</strong>
            </button>
          ))}
        </section>

        <aside className="archive-board" data-reveal>
          <span className="eyebrow marker-red">Version history</span>
          <h2>Portfolio Archive</h2>
          <p>A timeline of experiments, rebuilds, and better decisions.</p>
          <ol className="bus-timeline">
            <li><span>2024</span><strong>First portfolio</strong><small>HTML, CSS, and learning in public.</small></li>
            <li><span>2025</span><strong>More experiments</strong><small>Interactive projects and stronger React skills.</small></li>
            <li className="current"><span>2026</span><strong>Current build</strong><small>Clearer positioning and a more intentional identity.</small></li>
            <li><span>Next</span><strong>Keep improving</strong><small>Better case studies and useful tools.</small></li>
          </ol>
          {archivedProjects.map((item) => (
            <button className="archive-link" type="button" key={item.id} onClick={() => setActive(item)}>
              Open {item.title}
            </button>
          ))}
        </aside>
      </div>

      {active && (
        <div className="project-dialog-backdrop" role="presentation" onMouseDown={() => setActive(null)}>
          <section
            className="project-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            tabIndex={-1}
            ref={dialogRef}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="dialog-close" type="button" onClick={() => setActive(null)} aria-label="Close project folder"><X /></button>
            <div className="project-sheet-media"><img src={active.image} alt={`${active.title} preview`} /></div>
            <div className="project-sheet-copy">
              <span className="eyebrow">Project file</span>
              <h2 id="project-title">{active.title}</h2>
              <h3>What it does</h3>
              <p>{active.docs?.overview || active.description}</p>
              <h3>Built with</h3>
              <div className="tech-list">{active.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
              <h3>Main challenge</h3>
              <p>{active.docs?.challenge || "Turning an early idea into a clear, responsive experience that remains easy to use."}</p>
              <div className="project-actions">
                {active.link && <a className="big-key big-key-green" href={active.link} target="_blank" rel="noreferrer">Visit site <ExternalLink /></a>}
                {active.github && <a className="big-key big-key-blue" href={active.github} target="_blank" rel="noreferrer">View GitHub <Github /></a>}
              </div>
            </div>
          </section>
        </div>
      )}
    </PageShell>
  );
}
