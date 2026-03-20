import { useState, useEffect } from "react";
import { Heart, Eye, Smile, Folder, Mail, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import ScatteredNotes from "./ScatteredNotes";
import { useTypewriter } from "../hooks/useTypewriter";
import cvFile from "../assets/images/CvCharles.pdf";

const STICKY_TEXT = "Hope you have a nice wonderful day : )";
const MODAL_TEXT  = "Hope you loved your self the way you give love to others";

const MOBILE_NAV = [
  { path: "/about",    label: "About",    Icon: Smile },
  { path: "/projects", label: "Projects", Icon: Folder },
  { path: "/contact",  label: "Contact",  Icon: Mail },
  { path: "/resume",   label: "Resume",   Icon: GraduationCap },
];

function TypewriterCursor({ current, total }) {
  if (current >= total) return null;
  return <span className="typewriter-cursor" aria-hidden="true">{"|"}</span>;
}

function Hero() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  );
  const [heartCount, setHeartCount] = useState(() => {
    const saved = localStorage.getItem("portfolio-hearts");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showModal, setShowModal] = useState(false);
  const [viewerCount, setViewerCount] = useState(null);

  const stickyTyped = useTypewriter(STICKY_TEXT, 75, true);
  const modalTyped  = useTypewriter(MODAL_TEXT, 42, showModal);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/tsarles-portfolio-v2/views/up")
      .then(r => r.json())
      .then(d => setViewerCount(d.count))
      .catch(() => setViewerCount(null));
  }, []);

  const handleHeartClick = () => {
    const next = heartCount + 1;
    setHeartCount(next);
    localStorage.setItem("portfolio-hearts", next);
    setShowModal(true);
  };

  const handleDownloadCV = () => {
    const a = document.createElement("a");
    a.href = cvFile;
    a.download = "Charles_Cabral_CV.pdf";
    a.click();
  };

  return (
    <section className="hero" aria-label="Hero section">

      {/* ── Desktop: floating scattered icons ── */}
      <div className="hero-desktop-nav">
        <Navigation variant="hero" />
      </div>

      {isMobile ? (
        /* ══════ MOBILE LAYOUT ══════ */
        <div className="hero-mobile-layout">
          {/* Sticky note */}
          <div className="hero-sticky-note">
            <p className="hero-sticky-note-text">
              {stickyTyped}
              <TypewriterCursor current={stickyTyped.length} total={STICKY_TEXT.length} />
            </p>
            <button type="button" className="hero-heart-btn" onClick={handleHeartClick} aria-label="Send love">
              <Heart />
              {heartCount ? <span className="hero-heart-count">{heartCount}</span> : null}
            </button>
          </div>

          {/* 4 sticky notes in a 2×2 grid */}
          <ScatteredNotes mobile />

          {/* Main card */}
          <div className="hero-card-wrap">
            <div className="hero-card">
              <h1>Welcome to my unorganized life</h1>
            </div>
            <div className="hero-signature">Charles@2026</div>
          </div>

          {/* Viewer + download */}
          <div className="hero-bottom-row">
            {viewerCount !== null && (
              <div className="viewer-badge" style={{position:"relative",bottom:"auto",left:"auto"}}>
                <Eye size={14} />
                <span>{viewerCount.toLocaleString()} {viewerCount === 1 ? "view" : "views"}</span>
              </div>
            )}
            <button type="button" className="hero-cv-btn" style={{position:"relative",bottom:"auto",right:"auto"}} onClick={handleDownloadCV}>
              Download CV
            </button>
          </div>
        </div>
      ) : (
        /* ══════ DESKTOP LAYOUT ══════ */
        <>
          <ScatteredNotes />

          <div className="hero-sticky-note">
            <p className="hero-sticky-note-text">
              {stickyTyped}
              <TypewriterCursor current={stickyTyped.length} total={STICKY_TEXT.length} />
            </p>
            <button type="button" className="hero-heart-btn" onClick={handleHeartClick} aria-label="Send love">
              <Heart />
              {heartCount ? <span className="hero-heart-count">{heartCount}</span> : null}
            </button>
          </div>

          <div className="hero-card-wrap">
            <div className="hero-sticky-accent" aria-hidden="true">stay curious ✦</div>
            <div className="hero-card">
              <h1>Welcome to my unorganized life</h1>
            </div>
            <div className="hero-signature" aria-hidden="true">Charles@2026</div>
          </div>

          {viewerCount !== null && (
            <div className="viewer-badge">
              <Eye size={14} />
              <span>{viewerCount.toLocaleString()} {viewerCount === 1 ? "view" : "views"}</span>
            </div>
          )}
          <button type="button" className="hero-cv-btn" onClick={handleDownloadCV}>
            Download CV
          </button>
        </>
      )}

      {/* ── Mobile bottom dock ── */}
      <nav className="hero-mobile-dock" aria-label="Navigation">
        {MOBILE_NAV.map(({ path, label, Icon }) => (
          <button key={path} className="dock-item" onClick={() => navigate(path)}>
            <span className="dock-icon"><Icon size={22} strokeWidth={1.8} /></span>
            <span className="dock-label">{label}</span>
          </button>
        ))}
      </nav>

      {/* ── Love modal ── */}
      {showModal && (
        <div
          className="hero-love-modal-overlay"
          onClick={() => setShowModal(false)}
          onKeyDown={e => e.key === "Escape" && setShowModal(false)}
          role="button" tabIndex={0} aria-label="Close modal"
        >
          <div className="hero-love-modal" onClick={e => e.stopPropagation()}>
            <p className="hero-love-modal-text">
              {modalTyped}
              <TypewriterCursor current={modalTyped.length} total={MODAL_TEXT.length} />
            </p>
            <button type="button" className="hero-love-modal-close" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
