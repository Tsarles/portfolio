import { useState } from "react";
import { Heart } from "lucide-react";
import Navigation from "./Navigation";
import { useTypewriter } from "../hooks/useTypewriter";

const STICKY_TEXT = "Hope you have a nice wonderful day : )";
const MODAL_TEXT = "Hope you loved your self the way you give love to others";

function TypewriterCursor({ current, total }) {
  if (current >= total) return null;
  return <span className="typewriter-cursor" aria-hidden="true">{"|"}</span>;
}

function Hero() {
  const [heartCount, setHeartCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const stickyTyped = useTypewriter(STICKY_TEXT, 75, true);
  const modalTyped = useTypewriter(MODAL_TEXT, 42, showModal);

  const handleHeartClick = () => {
    setHeartCount((c) => c + 1);
    setShowModal(true);
  };

  return (
    <section className="hero" aria-label="Hero section">
      <Navigation variant="hero" />

      <div className="hero-card-wrap">
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

        <div className="hero-card">
          <h1>Welcome to my unorganized life</h1>
        </div>
      </div>

      <p className="note left-note">Enjoy to discover stuff about me!</p>
      <p className="note signature">@Tsarles2026</p>

      {showModal && (
        <div
          className="hero-love-modal-overlay"
          onClick={() => setShowModal(false)}
          onKeyDown={(e) => e.key === "Escape" && setShowModal(false)}
          role="button"
          tabIndex={0}
          aria-label="Close modal"
        >
          <div
            className="hero-love-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="hero-love-modal-text">
              {modalTyped}
              <TypewriterCursor current={modalTyped.length} total={MODAL_TEXT.length} />
            </p>
            <button
              type="button"
              className="hero-love-modal-close"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
