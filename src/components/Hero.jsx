import { useState, useEffect, useRef } from "react";
import { Heart, Eye, Smile, Folder, Mail, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Navigation from "./Navigation";
import ScatteredNotes from "./ScatteredNotes";
import { useTypewriter } from "../hooks/useTypewriter";

const STICKY_TEXT = "Hope you have a nice wonderful day : )";
const MODAL_TEXT  = "Hope you loved your self the way you give love to others";

const MOBILE_NAV = [
  { path: "/about",    label: "About me",  Icon: Smile,          rot: -8 },
  { path: "/projects", label: "Projects",  Icon: Folder,         rot:  5 },
  { path: "/contact",  label: "Contact",   Icon: Mail,           rot: -5 },
  { path: "/resume",   label: "Resume",    Icon: GraduationCap,  rot:  7 },
];

function TypewriterCursor({ current, total }) {
  if (current >= total) return null;
  return <span className="typewriter-cursor" aria-hidden="true">{"|"}</span>;
}

export default function Hero() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  );
  const [heartCount, setHeartCount]   = useState(null);
  const [showModal, setShowModal]     = useState(false);
  const [viewerCount, setViewerCount] = useState(null);
  const [heartPopped, setHeartPopped] = useState(false);

  const stickyTyped = useTypewriter(STICKY_TEXT, 75, true);
  const modalTyped  = useTypewriter(MODAL_TEXT, 42, showModal);

  const heroRef      = useRef(null);
  const versionRef   = useRef(null);
  const stickyRef    = useRef(null);
  const cardRef      = useRef(null);
  const signatureRef = useRef(null);
  const heartBtnRef  = useRef(null);

  // Responsive listener
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = e => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Page view counter (intentional increment per visit)
  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/tsarles-portfolio-v2/views/up")
      .then(r => r.json())
      .then(d => setViewerCount(d.count))
      .catch(() => setViewerCount(null));
  }, []);

  // ✅ READ-ONLY heart count on load — never increments here
  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/tsarles-portfolio-v2/hearts")
      .then(r => r.json())
      .then(d => setHeartCount(d.count ?? d.value ?? 0))
      .catch(() => {
        const saved = localStorage.getItem("portfolio-hearts");
        setHeartCount(saved ? parseInt(saved, 10) : 0);
      });
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "back.out(1.4)" } });
      if (versionRef.current)   tl.from(versionRef.current,   { opacity:0, scale:0.5, rotation:-20, duration:0.6 }, 0.2);
      if (stickyRef.current)    tl.from(stickyRef.current,    { opacity:0, y:-30, duration:0.6, ease:"power3.out" }, 0.4);
      if (cardRef.current)      tl.from(cardRef.current,      { opacity:0, scale:0.85, y:40, duration:0.7 }, 0.6);
      if (signatureRef.current) tl.from(signatureRef.current, { opacity:0, x:-20, duration:0.5, ease:"power2.out" }, 1.0);

      if (!isMobile) {
        tl.from(".hero-desktop-nav .icon-nav", {
          opacity:0, scale:0.6, rotation:15, stagger:0.12, duration:0.55,
        }, 0.8);
      }
      if (isMobile) {
        tl.from(".mob-nav-btn", {
          opacity:0, y:28, scale:0.85, stagger:0.09, duration:0.45, ease:"back.out(1.3)",
        }, 0.9);
      }
    }, heroRef);
    return () => ctx.revert();
  }, [isMobile]);

  // ✅ Heart increments ONLY on explicit click
  const handleHeartClick = () => {
    if (heartPopped) return;
    setHeartPopped(true);
    setTimeout(() => setHeartPopped(false), 600);

    if (heartBtnRef.current) {
      gsap.fromTo(heartBtnRef.current,
        { scale: 1 },
        { scale: 1.4, duration: 0.14, ease: "power2.out",
          onComplete: () => gsap.to(heartBtnRef.current, { scale:1, duration:0.35, ease:"elastic.out(1.5,0.4)" })
        }
      );
    }

    fetch("https://api.counterapi.dev/v1/tsarles-portfolio-v2/hearts/up")
      .then(r => r.json())
      .then(d => setHeartCount(d.count ?? d.value))
      .catch(() => setHeartCount(prev => (prev || 0) + 1));

    const local = parseInt(localStorage.getItem("portfolio-hearts") || "0", 10) + 1;
    localStorage.setItem("portfolio-hearts", local);
    setShowModal(true);
  };

  return (
    <section className="hero" ref={heroRef} aria-label="Hero section">

      {/* Version Badge */}
      <div className="version-badge" ref={versionRef}>
        <span className="version-badge-text">v1.2</span>
      </div>

      {/* Desktop floating nav icons */}
      <div className="hero-desktop-nav">
        <Navigation variant="hero" />
      </div>

      {isMobile ? (
        /* ══════════ MOBILE ══════════ */
        <div className="hero-mobile-layout">

          <div className="hero-sticky-note mob-sticky" ref={stickyRef}>
            <div className="sticky-tape" aria-hidden="true" />
            <p className="hero-sticky-note-text">
              {stickyTyped}
              <TypewriterCursor current={stickyTyped.length} total={STICKY_TEXT.length} />
            </p>
            <button
              type="button"
              ref={heartBtnRef}
              className={`hero-heart-btn${heartPopped ? " heart-popped" : ""}`}
              onClick={handleHeartClick}
              aria-label="Send love"
            >
              <Heart />
              {heartCount ? <span className="hero-heart-count">{heartCount}</span> : null}
            </button>
          </div>

          <ScatteredNotes mobile />

          <div className="hero-card-wrap mob-card-wrap" ref={cardRef}>
            <div className="hero-card">
              <h1>Welcome to my unorganized life</h1>
            </div>
            <div className="hero-signature" ref={signatureRef}>@Cha2026</div>
          </div>

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

          {viewerCount !== null && (
            <div className="hero-bottom-row">
              <div className="viewer-badge" style={{ position:"relative", bottom:"auto", left:"auto" }}>
                <Eye size={14} />
                <span>{viewerCount.toLocaleString()} {viewerCount === 1 ? "view" : "views"}</span>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* ══════════ DESKTOP ══════════ */
        <>
          <ScatteredNotes />

          <div className="hero-sticky-note" ref={stickyRef}>
            <div className="sticky-tape" aria-hidden="true" />
            <p className="hero-sticky-note-text">
              {stickyTyped}
              <TypewriterCursor current={stickyTyped.length} total={STICKY_TEXT.length} />
            </p>
            <button
              type="button"
              ref={heartBtnRef}
              className={`hero-heart-btn${heartPopped ? " heart-popped" : ""}`}
              onClick={handleHeartClick}
              aria-label="Send love"
            >
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
        </>
      )}

      {/* Love modal */}
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
