import { useState, useEffect, useRef } from "react";
import { Heart, Eye, Smile, Folder, Mail, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Navigation from "./Navigation";
import ScatteredNotes from "./ScatteredNotes";
import { useTypewriter } from "../hooks/useTypewriter";
import cvFile from "../assets/images/CvCharles.pdf";

const STICKY_TEXT = "Hope you have a nice wonderful day : )";
const MODAL_TEXT  = "Hope you loved your self the way you give love to others";

const MOBILE_NAV = [
  { path: "/about",    label: "About me",  Icon: Smile,          rot: -8  },
  { path: "/projects", label: "Projects",  Icon: Folder,         rot:  5  },
  { path: "/contact",  label: "Contact",   Icon: Mail,           rot: -5  },
  { path: "/resume",   label: "Resume",    Icon: GraduationCap,  rot:  7  },
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
  const [heartCount, setHeartCount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewerCount, setViewerCount] = useState(null);

  const stickyTyped = useTypewriter(STICKY_TEXT, 75, true);
  const modalTyped  = useTypewriter(MODAL_TEXT, 42, showModal);

  // Refs for GSAP
  const heroRef = useRef(null);
  const versionRef = useRef(null);
  const stickyRef = useRef(null);
  const cardRef = useRef(null);
  const signatureRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = e => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Fetch view count
  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/tsarles-portfolio-v2/views/up")
      .then(r => r.json())
      .then(d => setViewerCount(d.count))
      .catch(() => setViewerCount(null));
  }, []);

  // Fetch global heart count
  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/tsarles-portfolio-v2/hearts/up")
      .then(r => r.json())
      .then(d => setHeartCount(d.count))
      .catch(() => {
        const saved = localStorage.getItem("portfolio-hearts");
        setHeartCount(saved ? parseInt(saved, 10) : 0);
      });
  }, []);

  // GSAP entry animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Version badge
      if (versionRef.current) {
        gsap.from(versionRef.current, {
          opacity: 0,
          scale: 0.5,
          rotation: -20,
          duration: 0.7,
          delay: 0.3,
          ease: "back.out(1.7)",
        });
      }
      // Sticky note
      if (stickyRef.current) {
        gsap.from(stickyRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.6,
          delay: 0.5,
          ease: "power3.out",
        });
      }
      // Card
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          opacity: 0,
          scale: 0.85,
          y: 40,
          duration: 0.7,
          delay: 0.7,
          ease: "back.out(1.4)",
        });
      }
      // Signature
      if (signatureRef.current) {
        gsap.from(signatureRef.current, {
          opacity: 0,
          x: -20,
          duration: 0.5,
          delay: 1.1,
          ease: "power2.out",
        });
      }
      // Nav icons (desktop)
      if (!isMobile) {
        gsap.from(".hero-desktop-nav .icon-nav", {
          opacity: 0,
          scale: 0.6,
          rotation: 15,
          stagger: 0.15,
          duration: 0.6,
          delay: 0.9,
          ease: "back.out(1.5)",
        });
      }
      // Mobile nav buttons
      if (isMobile) {
        gsap.from(".mob-nav-btn", {
          opacity: 0,
          y: 30,
          scale: 0.8,
          stagger: 0.1,
          duration: 0.5,
          delay: 1.0,
          ease: "back.out(1.3)",
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleHeartClick = () => {
    // Increment global counter
    fetch("https://api.counterapi.dev/v1/tsarles-portfolio-v2/hearts/up")
      .then(r => r.json())
      .then(d => setHeartCount(d.count))
      .catch(() => {
        setHeartCount(prev => (prev || 0) + 1);
      });
    
    // Also store locally as fallback
    const local = parseInt(localStorage.getItem("portfolio-hearts") || "0", 10) + 1;
    localStorage.setItem("portfolio-hearts", local);
    
    setShowModal(true);
  };

  const handleDownloadCV = () => {
    const a = document.createElement("a");
    a.href = cvFile;
    a.download = "Charles_Cabral_CV.pdf";
    a.click();
  };

  return (
    <section className="hero" ref={heroRef} aria-label="Hero section">

      {/* ── Version Badge — top left ── */}
      <div className="version-badge" ref={versionRef}>
        <span className="version-badge-text">v1.1</span>
      </div>

      {/* ── Desktop only: floating scattered icons ── */}
      <div className="hero-desktop-nav">
        <Navigation variant="hero" />
      </div>

      {isMobile ? (
        /* ══════════════ MOBILE ══════════════ */
        <div className="hero-mobile-layout">

          {/* Sticky note — full width, top */}
          <div className="hero-sticky-note mob-sticky" ref={stickyRef}>
            <div className="sticky-tape" aria-hidden="true"></div>
            <p className="hero-sticky-note-text">
              {stickyTyped}
              <TypewriterCursor current={stickyTyped.length} total={STICKY_TEXT.length} />
            </p>
            <button type="button" className="hero-heart-btn" onClick={handleHeartClick} aria-label="Send love">
              <Heart />
              {heartCount ? <span className="hero-heart-count">{heartCount}</span> : null}
            </button>
          </div>

          {/* Scattered notes grid */}
          <ScatteredNotes mobile />

          {/* Main card */}
          <div className="hero-card-wrap mob-card-wrap" ref={cardRef}>
            <div className="hero-card">
              <h1>Welcome to my unorganized life</h1>
            </div>
            <div className="hero-signature" ref={signatureRef}>@Cha2026</div>
          </div>

          {/* Nav icons scattered below the card */}
          <div className="mob-nav-icons">
            {MOBILE_NAV.map(({ path, label, Icon, rot }) => (
              <button
                key={path}
                className="mob-nav-btn"
                onClick={() => navigate(path)}
                style={{ "--rot": `${rot}deg` }}
              >
                <span className="mob-nav-icon"><Icon size={24} strokeWidth={1.8} /></span>
                <span className="mob-nav-label">{label}</span>
              </button>
            ))}
          </div>

          {/* Views + CV */}
          <div className="hero-bottom-row">
            {viewerCount !== null && (
              <div className="viewer-badge" style={{ position:"relative", bottom:"auto", left:"auto" }}>
                <Eye size={14} />
                <span>{viewerCount.toLocaleString()} {viewerCount === 1 ? "view" : "views"}</span>
              </div>
            )}
            <button type="button" className="hero-cv-btn"
              style={{ position:"relative", bottom:"auto", right:"auto" }}
              onClick={handleDownloadCV}>
              Download CV
            </button>
          </div>

        </div>
      ) : (
        /* ══════════════ DESKTOP ══════════════ */
        <>
          <ScatteredNotes />

          <div className="hero-sticky-note" ref={stickyRef}>
            <div className="sticky-tape" aria-hidden="true"></div>
            <p className="hero-sticky-note-text">
              {stickyTyped}
              <TypewriterCursor current={stickyTyped.length} total={STICKY_TEXT.length} />
            </p>
            <button type="button" className="hero-heart-btn" onClick={handleHeartClick} aria-label="Send love">
              <Heart />
              {heartCount ? <span className="hero-heart-count">{heartCount}</span> : null}
            </button>
          </div>

          <div className="hero-card-wrap" ref={cardRef}>
            <div className="hero-sticky-accent" aria-hidden="true">stay curious ✦</div>
            <div className="hero-card">
              <h1>Welcome to my unorganized life</h1>
            </div>
            <div className="hero-signature" ref={signatureRef} aria-hidden="true">@Cha2026</div>
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

      {/* Love modal */}
      {showModal && (
        <div className="hero-love-modal-overlay"
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
