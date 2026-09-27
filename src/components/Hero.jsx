import { useEffect, useRef, useState } from "react";
import { ArrowDownToLine, ArrowUpRight, Bike, Heart, Languages, MonitorCog, X } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import PageShell from "./PageShell";
import me from "../assets/me.jpg";
import resume from "../assets/pdfs/CharlesCabralCV.pdf";
import { useTypewriter } from "../hooks/useTypewriter";

const STICKY_TEXT = "Hope you have a nice wonderful day : )";
const LOVE_TEXT = "I hope you love yourself as much as you love others.";

export default function Hero() {
  const [showLove, setShowLove] = useState(false);
  const [liked, setLiked] = useState(() => localStorage.getItem("cha-note-liked") === "true");
  const heartRef = useRef(null);
  const stickyTyped = useTypewriter(STICKY_TEXT, 68, true);
  const loveTyped = useTypewriter(LOVE_TEXT, 40, showLove);

  useEffect(() => {
    if (!showLove) return undefined;
    const close = (event) => event.key === "Escape" && setShowLove(false);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [showLove]);

  const heartNote = () => {
    setLiked(true);
    localStorage.setItem("cha-note-liked", "true");
    setShowLove(true);
    gsap.fromTo(heartRef.current, { scale: 1 }, { scale: 1.42, duration: .15, yoyo: true, repeat: 1, ease: "power2.out" });
  };

  return (
    <PageShell pageClass="home-page" label="Homepage">
      <aside className="love-note" data-reveal aria-label="A note for visitors">
        <span className="love-note-tape" aria-hidden="true" />
        <p>
          {stickyTyped}
          {stickyTyped.length < STICKY_TEXT.length && <span className="typewriter-cursor" aria-hidden="true">|</span>}
        </p>
        <button
          type="button"
          ref={heartRef}
          className={`love-note-heart${liked ? " is-liked" : ""}`}
          onClick={heartNote}
          aria-label={liked ? "You hearted this note. Open it again" : "Heart this note"}
        >
          <Heart aria-hidden="true" />
        </button>
      </aside>

      <section className="hero-board paper-panel" data-reveal>
        <div className="paper-tabs" aria-hidden="true"><i /><i /><i /></div>
        <div className="hero-copy">
          <span className="eyebrow marker-blue">Hello, I’m</span>
          <h1>Cha.</h1>
          <p className="hero-role">BSIT student building useful web apps and solving everyday tech problems.</p>
          <p className="hand-line">I learn by building things I actually want to use.</p>
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

      {showLove && (
        <div className="love-dialog-backdrop" role="presentation" onMouseDown={() => setShowLove(false)}>
          <section className="love-dialog" role="dialog" aria-modal="true" aria-label="A note about self-love" onMouseDown={(event) => event.stopPropagation()}>
            <button type="button" className="love-dialog-close" onClick={() => setShowLove(false)} aria-label="Close note"><X /></button>
            <Heart className="love-dialog-heart" aria-hidden="true" />
            <p>
              {loveTyped}
              {loveTyped.length < LOVE_TEXT.length && <span className="typewriter-cursor" aria-hidden="true">|</span>}
            </p>
          </section>
        </div>
      )}
    </PageShell>
  );
}
