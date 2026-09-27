import { ArrowDownToLine, BadgeCheck, Bike, BookOpen, BriefcaseBusiness, Database, Languages, MonitorCog } from "lucide-react";
import PageShell from "../components/PageShell";
import me from "../assets/me.jpg";
import resume from "../assets/pdfs/CharlesCabralCV.pdf";

const careerPaths = [
  { icon: MonitorCog, label: "IT Support" },
  { icon: BriefcaseBusiness, label: "Administrative Assistant" },
  { icon: BookOpen, label: "Future Educator" },
];

const learning = [
  { icon: Languages, label: "Bahasa Indonesia" },
  { icon: MonitorCog, label: "Machine Learning" },
  { icon: Database, label: "Big Data & Analytics" },
];

const certificates = [
  {
    id: "676a5c46-7143-4b45-94e5-edd5d8f51c1f",
    url: "https://www.credly.com/badges/676a5c46-7143-4b45-94e5-edd5d8f51c1f",
  },
  {
    id: "123f4dce-0235-43f8-a8cb-495673135907",
    url: "https://www.credly.com/badges/123f4dce-0235-43f8-a8cb-495673135907",
  },
  {
    id: "73f9157b-c924-470c-a4b7-902a52b178cb",
    url: "https://www.credly.com/badges/73f9157b-c924-470c-a4b7-902a52b178cb",
  },
];

export default function About() {
  return (
    <PageShell pageClass="about-v2" label="About Charles Cabral">
      <header className="page-heading" data-reveal>
        <span className="eyebrow marker-red">Profile evidence</span>
        <h1>Case File: Cha</h1>
        <p>A closer look at the work, interests, and paths I’m exploring.</p>
      </header>

      <section className="case-folder" data-reveal>
        <div className="folder-tab">FILE NO. CHA–2026</div>
        <div className="case-left">
          <figure className="case-photo">
            <img src={me} alt="Charles Cabral" />
            <figcaption>Charles “Cha” Cabral</figcaption>
          </figure>
          <div className="profile-summary">
            <span>BSIT Student · Quezon City</span>
            <h2>Curious about technology, people, and how things work.</h2>
            <p>I enjoy solving practical problems, learning new skills, documenting clear processes, and building tools that people can actually use.</p>
          </div>
          <article className="evidence-strip">
            <h3>What I bring</h3>
            <p>Troubleshooting · Documentation · Communication · Web Development · Recruitment Operations</p>
          </article>
          <article className="personal-evidence">
            <Bike aria-hidden="true" />
            <div>
              <h3>Beyond the screen</h3>
              <p>Cycling, language learning, practical projects, and helping people understand technology.</p>
            </div>
          </article>
        </div>

        <div className="case-right">
          <div className="evidence-columns">
            <article className="evidence-note evidence-blue">
              <h3>Career paths</h3>
              <ul>
                {careerPaths.map((item) => <li key={item.label}><item.icon /> {item.label}</li>)}
              </ul>
            </article>
            <article className="evidence-note evidence-red">
              <h3>Currently learning</h3>
              <ul>
                {learning.map((item) => <li key={item.label}><item.icon /> {item.label}</li>)}
              </ul>
            </article>
          </div>

          <section className="cert-section" aria-labelledby="cert-title">
            <div className="section-title-row">
              <div>
                <span className="eyebrow">Credential check</span>
                <h2 id="cert-title">Certifications</h2>
              </div>
              <BadgeCheck aria-hidden="true" />
            </div>

            <p className="cert-note">These credentials are displayed and verified directly by Credly.</p>
            <div className="certificate-grid">
              {certificates.map((certificate, index) => (
                <article className="certificate-card" key={certificate.id}>
                  <iframe
                    src={`https://www.credly.com/embedded_badge/${certificate.id}`}
                    title={`Verified Credly credential ${index + 1}`}
                    loading="lazy"
                    allowFullScreen
                  />
                  <a href={certificate.url} target="_blank" rel="noreferrer">
                    Confirm on Credly
                  </a>
                </article>
              ))}
            </div>
          </section>

          <a className="big-key big-key-green resume-key" href={resume} download>
            Download résumé <ArrowDownToLine />
          </a>
        </div>
      </section>
    </PageShell>
  );
}
