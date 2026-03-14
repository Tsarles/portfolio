import { projects } from "../data/projectsData";
import DraggableSideNav from "../components/DraggableSideNav";

function Projects() {
  return (
    <section className="projects-page">

      {/* CONTENT */}
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

      <p className="projects-future-note">
        More projects coming soon — stay tuned :)
      </p>

      <DraggableSideNav />
    </section>
  );
}

export default Projects;
