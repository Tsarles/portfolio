import { useState, useEffect } from "react";
import { Heart, Eye } from "lucide-react";
import Navigation from "./Navigation";
import { useTypewriter } from "../hooks/useTypewriter";
import cvFile from "../assets/images/CvCharles.pdf";

const STICKY_TEXT = "Hope you have a nice wonderful day : )";
const MODAL_TEXT  = "Hope you loved your self the way you give love to others";

function TypewriterCursor({ current, total }) {
  if (current >= total) return null;
  return <span className="typewriter-cursor" aria-hidden="true">{"|"}</span>;
}

function Hero() {
  const [heartCount, setHeartCount] = useState(() => {
    const saved = localStorage.getItem("portfolio-hearts");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showModal, setShowModal] = useState(false);
  const [viewerCount, setViewerCount] = useState(null);

  const stickyTyped = useTypewriter(STICKY_TEXT, 75, true);
  const modalTyped  = useTypewriter(MODAL_TEXT, 42, showModal);

  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/tsarles2026-portfolio/views/up")
      .then((r) => r.json())
      .then((d) => setViewerCount(d.count))
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
      <Navigation variant="hero" />

      {/* Sticky note — always visible, pinned top-center on mobile */}
      <div className="hero-sticky-note">
        <p className="hero-sticky-note-text">
          {stickyTyped}
          <TypewriterCursor current={stickyTyped.length} total={STICKY_TEXT.length} />
        </p>
        <button
          type="button"
          className="hero-heart-btn"
          onClick={handleHeartClick}
          aria-label="Send love"
        >
          <Heart />
          {heartCount ? <span className="hero-heart-count">{heartCount}</span> : null}
        </button>
      </div>

      {/* Main card group */}
      <div className="hero-card-wrap">
        {/* Small accent note — desktop only */}
        <div className="hero-sticky-accent">stay curious ✦</div>

        <div className="hero-card">
          <h1>Welcome to my unorganized life</h1>
          {/* Signature lives inside / below the card */}
          <div className="hero-signature">Charles@2026</div>
        </div>
      </div>

      {/* Viewer count */}
      {viewerCount !== null && (
        <div className="viewer-badge">
          <Eye size={14} />
          <span>{viewerCount.toLocaleString()} {viewerCount === 1 ? "view" : "views"}</span>
        </div>
      )}

      {/* CV Download */}
      <button
        type="button"
        className="hero-cv-btn"
        onClick={handleDownloadCV}
        aria-label="Download CV"
      >
        Download CV
      </button>

      {/* Love modal */}
      {showModal && (
        <div
          className="hero-love-modal-overlay"
          onClick={() => setShowModal(false)}
          onKeyDown={(e) => e.key === "Escape" && setShowModal(false)}
          role="button"
          tabIndex={0}
          aria-label="Close modal"
        >
          <div className="hero-love-modal" onClick={(e) => e.stopPropagation()}>
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
