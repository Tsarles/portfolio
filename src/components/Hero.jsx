import { ArrowDownToLine, ArrowUpRight, Bike, Languages, MonitorCog } from "lucide-react";
import { Link } from "react-router-dom";
import PageShell from "./PageShell";
import me from "../assets/me.jpg";
import resume from "../assets/pdfs/CharlesCabralCV.pdf";

export default function Hero() {
  return (
    <PageShell pageClass="home-page" label="Homepage">
      <section className="hero-board paper-panel" data-reveal>
        <div className="paper-tabs" aria-hidden="true"><i /><i /><i /></div>
        <div className="hero-copy">
          <span className="eyebrow marker-blue">Hello, I’m</span>
          <h1>Cha.</h1>
          <p className="hero-role">BSIT student building useful web apps and solving everyday tech problems.</p>
          <p className="hand-line">Welcome to my organized chaos.</p>
          <div className="hero-actions">
            <Link className="big-key big-key-green" to="/projects">
              View projects <ArrowUpRight />
            </Link>
            <a className="big-key big-key-blue" href={resume} download>
              Download résumé <ArrowDownToLine />
            </a>
          </div>
        </div>

        <div className="hero-profile">
          <figure className="polaroid">
            <img src={me} alt="Charles Cabral" />
            <figcaption>@Cha2026</figcaption>
          </figure>
          <div className="profile-tags" aria-label="Current interests">
            <span><MonitorCog /> IT Support</span>
            <span><Languages /> Learning Bahasa</span>
            <span><Bike /> Cycling</span>
          </div>
        </div>
      </section>

      <div className="home-note note-red" data-reveal>same student.<br />bigger progress.</div>
      <div className="home-note note-blue" data-reveal>learn → build<br />→ repeat</div>
      <span className="version-stamp" data-reveal>v2.0 preview</span>
    </PageShell>
  );
}
