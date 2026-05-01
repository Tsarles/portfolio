import { useEffect } from "react";
import DraggableSideNav from "../components/DraggableSideNav";
import pdfFile from "../assets/pdfs/CharlesCabralCV.pdf";


/* ─────────────────────────────────────────────
   REVEAL HOOK (IntersectionObserver)
───────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".cv-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
function SectionHeader({ label }) {
  return (
    <div className="cv-section-header">
      <span className="cv-section-label">{label}</span>
      <div className="cv-section-rule" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   DOWNLOAD BUTTON
───────────────────────────────────────────── */
function DownloadBtn() {
  return (
    <a
      href={pdfFile}
      download="CharlesCabralCV.pdf"
      className="cv-download-btn"
    >
      <svg
        className="cv-download-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download CV
    </a>
  );
}

/* ─────────────────────────────────────────────
   SKILLS SECTION
───────────────────────────────────────────── */
const skillGroups = [
  { category: "Programming",     items: ["Java", "C#", "C++ (Arduino)", "PHP", "SQL"] },
  { category: "Web Development", items: ["React", "HTML", "CSS", "JavaScript"] },
  { category: "Databases",       items: ["SQL Server", "Firebase", "Supabase"] },
  { category: "IT & Technical",  items: ["PC Troubleshooting", "Hardware Assembly", "System Diagnostics", "Computer Maintenance"] },
  { category: "Tools",           items: ["Git", "SSMS", "Arduino IDE"] },
  { category: "AI & Automation", items: ["AI Tool Utilization", "Prompt Development"] },
  { category: "Professional",    items: ["Technical Communication", "Customer Service", "Analytical Thinking", "Adaptability", "Problem Solving"] },
];

function SkillsSection() {
  return (
    <div>
      {skillGroups.map((group) => (
        <div className="cv-skill-group" key={group.category}>
          <span className="cv-skill-category">{group.category}</span>
          <div className="cv-skill-tags">
            {group.items.map((item) => (
              <span className="cv-skill-tag" key={item}>{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   EXPERIENCE SECTION
───────────────────────────────────────────── */
function ExperienceSection() {
  return (
    <div>
      <div className="cv-entry">
        <div className="cv-entry-top">
          <span className="cv-entry-title">On-the-Job Training (OJT)</span>
          <span className="cv-entry-badge">IT Support</span>
        </div>
        <p className="cv-entry-org">SDR Computer Trading — Quezon City</p>
        <ul className="cv-entry-list">
          <li>Diagnosed hardware and software issues for client computers and provided technical support</li>
          <li>Assisted in assembling custom-built PCs based on client requirements</li>
          <li>Performed system diagnostics and recommended hardware upgrades</li>
          <li>Provided customer assistance for troubleshooting and system maintenance</li>
        </ul>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECTS SECTION
───────────────────────────────────────────── */
function ProjectsSection() {
  return (
    <div>
      <div className="cv-entry">
        <div className="cv-entry-top">
          <span className="cv-entry-title">One Tap Check System</span>
          <span className="cv-entry-badge">Research Project</span>
        </div>
        <p className="cv-entry-org">
          RFID Room Monitoring & Classroom Attendance System — Senior High School
        </p>
        <ul className="cv-entry-list">
          <li>Helped develop the project website interface</li>
          <li>Implemented front-end components using HTML, CSS, and JavaScript</li>
          <li>Assisted with displaying monitoring and attendance data through the web system</li>
          <li>Worked with the team to improve usability and system functionality</li>
        </ul>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EDUCATION SECTION
───────────────────────────────────────────── */
function EducationSection() {
  return (
    <div>
      <div className="cv-edu-entry">
        <div className="cv-edu-top">
          <div>
            <p className="cv-edu-degree">Bachelor of Science in Information Technology</p>
            <p className="cv-edu-school">STI College Muñoz EDSA</p>
          </div>
          <span className="cv-edu-note">Current Student</span>
        </div>
      </div>
      <div className="cv-edu-entry">
        <div className="cv-edu-top">
          <div>
            <p className="cv-edu-degree">Senior High School</p>
            <p className="cv-edu-school">
              Information Technology — Mobile Application & Web Development
              <br />
              STI College Muñoz EDSA
            </p>
          </div>
          <span className="cv-edu-note">High Honors</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Resume() {
  useReveal();

  return (
    <>
      <div className="cv-root">
        <div className="cv-col">
          {/* HEADER */}
          <header className="cv-header cv-reveal">
            <span className="cv-header-eyebrow">Portfolio — Résumé</span>
            <h1 className="cv-header-name">
              Charles Andrew<br />S. Cabral
            </h1>
            <p className="cv-header-subtitle">
              BSIT Student &nbsp;·&nbsp; Aspiring Developer
            </p>
            <p className="cv-header-summary">
              A Bachelor of Science in Information Technology student passionate about
              building useful and engaging web applications. Interested in web development,
              hardware systems, and emerging technologies such as artificial intelligence
              and microcontroller systems.
            </p>
            <DownloadBtn />
          </header>

          {/* SKILLS */}
          <section className="cv-section cv-reveal">
            <SectionHeader label="Skills" />
            <SkillsSection />
          </section>

          {/* EXPERIENCE */}
          <section className="cv-section cv-reveal">
            <SectionHeader label="Work Experience" />
            <ExperienceSection />
          </section>

          {/* PROJECTS */}
          <section className="cv-section cv-reveal">
            <SectionHeader label="Projects" />
            <ProjectsSection />
          </section>

          {/* EDUCATION */}
          <section className="cv-section cv-reveal">
            <SectionHeader label="Education" />
            <EducationSection />
          </section>

          {/* FOOTER */}
          <footer className="cv-footer cv-reveal">
            <p className="cv-footer-text">
              Built with code, curiosity, and a stubborn refusal to stop learning.
            </p>
          </footer>
        </div>
      </div>

      <DraggableSideNav />
    </>
  );
}