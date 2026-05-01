import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Code2, Sparkles, Cpu, Star } from "lucide-react";
import gsap from "gsap";
import me from "../assets/me.jpg";
import DraggableSideNav from "../components/DraggableSideNav";

/* ─────────────────────────────────────────────
   DOODLE SVG ICONS — hand-drawn style, no emojis
───────────────────────────────────────────── */
function DoodleHeart({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16,27 C16,27 4,19 4,11 A7,7 0 0,1 16,9 A7,7 0 0,1 28,11 C28,19 16,27 16,27 Z" />
    </svg>
  );
}
function DoodleCoffee({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7,12 L7,24 A3,3 0 0,0 10,27 L22,27 A3,3 0 0,0 25,24 L25,12 Z" />
      <path d="M25,14 Q30,14 30,18 Q30,22 25,22" />
      <path d="M12,7 Q12,4 14,7 Q14,10 16,7 Q16,4 18,7" />
    </svg>
  );
}
function DoodleCpu({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="14" height="14" rx="2" />
      <line x1="13" y1="9" x2="13" y2="5" /><line x1="19" y1="9" x2="19" y2="5" />
      <line x1="13" y1="23" x2="13" y2="27" /><line x1="19" y1="23" x2="19" y2="27" />
      <line x1="9" y1="13" x2="5" y2="13" /><line x1="9" y1="19" x2="5" y2="19" />
      <line x1="23" y1="13" x2="27" y2="13" /><line x1="23" y1="19" x2="27" y2="19" />
      <rect x="13" y="13" width="6" height="6" rx="1" />
    </svg>
  );
}
function DoodleGlobe({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="11" />
      <path d="M5,16 Q10,12 16,16 Q22,20 27,16" />
      <path d="M16,5 Q12,10 12,16 Q12,22 16,27" />
      <path d="M16,5 Q20,10 20,16 Q20,22 16,27" />
    </svg>
  );
}
function DoodleSparkles({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16,4 L17.5,13 L26,14.5 L17.5,16 L16,25 L14.5,16 L6,14.5 L14.5,13 Z" />
      <path d="M26,4 L26.8,7.2 L30,8 L26.8,8.8 L26,12 L25.2,8.8 L22,8 L25.2,7.2 Z" />
      <path d="M6,22 L6.5,24 L8.5,24.5 L6.5,25 L6,27 L5.5,25 L3.5,24.5 L5.5,24 Z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   ABOUT BACKGROUND DOODLES
───────────────────────────────────────────── */
const ABOUT_BG = [
  { sx:"3%",  sy:"8%",  r:-12, s:20, o:0.07, d:5.5, dl:0   , shape:"star"   },
  { sx:"94%", sy:"7%",  r: 15, s:16, o:0.06, d:6.0, dl:1.2 , shape:"star"   },
  { sx:"50%", sy:"2%",  r:  8, s:13, o:0.05, d:5.8, dl:0.8 , shape:"star"   },
  { sx:"5%",  sy:"42%", r:  0, s:32, o:0.06, d:7.0, dl:2.0 , shape:"wave"   },
  { sx:"88%", sy:"55%", r: -5, s:28, o:0.05, d:6.5, dl:0.5 , shape:"wave"   },
  { sx:"4%",  sy:"72%", r: -8, s:18, o:0.07, d:6.2, dl:1.5 , shape:"heart"  },
  { sx:"93%", sy:"28%", r: 10, s:15, o:0.06, d:7.0, dl:0.3 , shape:"heart"  },
  { sx:"87%", sy:"80%", r:  0, s:22, o:0.05, d:5.5, dl:1.0 , shape:"circle" },
  { sx:"7%",  sy:"22%", r:  0, s:14, o:0.05, d:6.8, dl:2.5 , shape:"circle" },
  { sx:"91%", sy:"45%", r: 30, s:16, o:0.08, d:5.2, dl:0.8 , shape:"plus"   },
  { sx:"3%",  sy:"55%", r: 15, s:12, o:0.07, d:6.5, dl:1.8 , shape:"plus"   },
  { sx:"90%", sy:"92%", r:-20, s:22, o:0.07, d:6.2, dl:0.4 , shape:"pencil" },
  { sx:"5%",  sy:"90%", r: 20, s:18, o:0.06, d:7.5, dl:2.2 , shape:"pencil" },
  { sx:"89%", sy:"15%", r:-15, s:26, o:0.06, d:6.0, dl:1.0 , shape:"arrow"  },
  { sx:"5%",  sy:"35%", r:  5, s:22, o:0.05, d:5.8, dl:1.6 , shape:"arrow"  },
];

function BgDoodle({ sx, sy, r, s, o, d, dl, shape }) {
  const base = {
    position:"absolute", left:sx, top:sy, opacity:o,
    transform:`rotate(${r}deg)`,
    animation:`about-bg-float ${d}s ease-in-out ${dl}s infinite`,
    willChange:"transform", color:"#155d29", pointerEvents:"none",
  };
  const paths = {
    star:   <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M10,2 L11.5,8.5 L18,10 L11.5,11.5 L10,18 L8.5,11.5 L2,10 L8.5,8.5 Z"/></svg>,
    wave:   <svg width={s} height={s*0.5} viewBox="0 0 40 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2,9 C6,3 12,15 18,9 C24,3 30,15 36,9 C38,7 39,8 40,9"/></svg>,
    heart:  <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10,16 C10,16 3,11 3,7 A4,4 0 0,1 10,6 A4,4 0 0,1 17,7 C17,11 10,16 10,16 Z"/></svg>,
    circle: <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10" cy="10" r="7"/></svg>,
    plus:   <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="10" y1="3" x2="10" y2="17"/><line x1="3" y1="10" x2="17" y2="10"/></svg>,
    pencil: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
    arrow:  <svg width={s} height={s*0.6} viewBox="0 0 36 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2,10 C8,10 26,10 34,10"/><path d="M26,4 L34,10 L26,16"/></svg>,
  };
  return <div style={base}>{paths[shape]}</div>;
}

/* ─────────────────────────────────────────────
   JOURNAL NOTE DATA — icons replace emojis
───────────────────────────────────────────── */
const JOURNAL_NOTES = [
  {
    id: "likes",
    title: "Things I enjoy",
    Icon: DoodleHeart,
    content: null,
    list: [
      "Watching drama series, especially Korean and Japanese dramas.",
      "Exploring great food and treating myself as a reward for hard work.",
      "Enjoying experiences that inspire and motivate me.",
    ],
    color: "#fce7f3",
    accent: "#f472b6",
    rot: -4,
  },
  {
    id: "joys",
    title: "Simple joys",
    Icon: DoodleCoffee,
    content: null,
    list: [
      "Being productive and making progress each day.",
      "Riding my bike and enjoying the breeze outdoors.",
      "Taking walks in the park without distractions.",
      "Building things that are both fun and useful.",
    ],
    color: "#fffbeb",
    accent: "#f59e0b",
    rot: 3,
  },
  {
    id: "learning",
    title: "Currently learning",
    Icon: DoodleCpu,
    content: null,
    list: [
      "Building reusable and scalable UI components.",
      "Advanced animations using GSAP and Three.js.",
      "Bahasa Indonesia.",
      "Effective AI prompting and creative workflow optimization.",
    ],
    color: "#f0fdf4",
    accent: "#22c55e",
    rot: -2,
  },
  {
    id: "wants",
    title: "I want to do",
    Icon: DoodleGlobe,
    content: "Travel to many countries and learn from people's stories and cultures. Continue growing through mistakes, experience, and reflection. Build a life and career that makes me genuinely proud.",
    list: null,
    color: "#eff6ff",
    accent: "#60a5fa",
    rot: 4,
  },
  {
    id: "faves",
    title: "My favourites",
    Icon: DoodleSparkles,
    content: null,
    list: [
      "Colors — Green & White",
      "Foods — Corn, Pizza, Sandwiches, Banana Bread",
      "Season — Winter",
      "Vibes — quiet mornings, good music",
    ],
    color: "#fefce8",
    accent: "#eab308",
    rot: -3,
  },
];

const SKILLS_PREVIEW = [
  { label: "React",      Icon: Code2     },
  { label: "JavaScript", Icon: Sparkles  },
  { label: "UI Design",  Icon: Star      },
  { label: "AI & ML",   Icon: Cpu       },
];

/* ─────────────────────────────────────────────
   PROFESSIONAL MODE TOGGLE
───────────────────────────────────────────── */
function ProModeToggle({ isOn, onToggle }) {
  return (
    <button
      type="button"
      className={`about-pro-toggle${isOn ? " about-pro-toggle--on" : ""}`}
      onClick={onToggle}
      aria-pressed={isOn}
      aria-label={isOn ? "Switch to personal mode" : "Switch to professional mode"}
    >
      <span className="pro-toggle-track">
        <span className="pro-toggle-knob" />
      </span>
      <span className="pro-toggle-text">
        {isOn ? "Professional Mode" : "Personal Mode"}
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────
   STICKY NOTE CARD
───────────────────────────────────────────── */
function StickyNote({ note, index, onOpen }) {
  const ref = useRef(null);
  const { Icon } = note;

  const handleClick = () => {
    if (ref.current) {
      gsap.fromTo(ref.current,
        { scale: 0.95, rotate: note.rot },
        { scale: 1.06, rotate: note.rot + 2, duration: 0.12, ease: "power2.out",
          onComplete: () => gsap.to(ref.current, { scale: 1, rotate: note.rot, duration: 0.25, ease: "back.out(2)" })
        }
      );
    }
    onOpen(note);
  };

  return (
    <div
      ref={ref}
      className="about-sticky-note"
      style={{
        "--sn-bg": note.color,
        "--sn-rot": `${note.rot}deg`,
        "--sn-delay": `${index * 0.07}s`,
      }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && handleClick()}
      aria-label={`${note.title} — tap to open`}
    >
      <div className="sticky-note-tape" aria-hidden="true" />
      <div className="sticky-note-doodle-icon" aria-hidden="true">
        <Icon size={26} />
      </div>
      <h3 className="sticky-note-title">{note.title}</h3>
      <span className="sticky-note-hint">tap to read →</span>
      <div className="sticky-note-corner" aria-hidden="true" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   NOTE MODAL — unfold / pop-open animation
───────────────────────────────────────────── */
function NoteModal({ note, onClose }) {
  const overlayRef = useRef(null);
  const cardRef    = useRef(null);

  useEffect(() => {
    if (!note || !overlayRef.current || !cardRef.current) return;
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.22 });
    // "unfold" from small sticky size
    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.5, rotate: note.rot * 3, y: 30, transformOrigin: "top center" },
      { opacity: 1, scale: 1,   rotate: 0,            y: 0,
        duration: 0.45, ease: "back.out(1.6)" }
    );
  }, [note]);

  const handleClose = useCallback(() => {
    if (!cardRef.current || !overlayRef.current) { onClose(); return; }
    // fold back
    gsap.to(cardRef.current, {
      opacity: 0, scale: 0.55, rotate: note.rot * 3, y: 20,
      transformOrigin: "top center",
      duration: 0.28, ease: "power2.in",
      onComplete: onClose,
    });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.22 });
  }, [onClose, note]);

  useEffect(() => {
    const esc = e => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [handleClose]);

  if (!note) return null;
  const { Icon } = note;

  return (
    <div
      ref={overlayRef}
      className="note-modal-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={note.title}
    >
      <div
        ref={cardRef}
        className="note-modal-card"
        style={{ "--modal-bg": note.color, "--modal-accent": note.accent }}
        onClick={e => e.stopPropagation()}
      >
        <div className="note-modal-tape"  aria-hidden="true" />
        <div className="note-modal-accent-bar" style={{ background: note.accent }} />

        <button className="note-modal-close" onClick={handleClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="note-modal-icon-wrap" aria-hidden="true">
          <Icon size={32} />
        </div>
        <h2 className="note-modal-title">{note.title}</h2>
        <div className="note-modal-divider" />

        {note.list ? (
          <ul className="note-modal-list">
            {note.list.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        ) : (
          <p className="note-modal-text">{note.content}</p>
        )}

        <div className="note-modal-corner" aria-hidden="true" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN ABOUT PAGE
───────────────────────────────────────────── */
export default function About() {
  const [openNote,    setOpenNote]    = useState(null);
  const [proMode,     setProMode]     = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();
  const pageRef  = useRef(null);
  const leftRef  = useRef(null);
  const rightRef = useRef(null);

  // Page entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "back.out(1.3)" } });
      tl.from(leftRef.current,  { opacity:0, x:-55, rotation:-7, duration:0.7,  delay:0.1 });
      tl.from(rightRef.current, { opacity:0, x: 55, rotation: 7, duration:0.7 }, "-=0.5");
      tl.from(".about-sticky-note", { opacity:0, y:22, scale:0.88, stagger:0.07, duration:0.48, ease:"back.out(1.2)" }, "-=0.4");
      tl.from(".about-skill-chip",  { opacity:0, y:10, scale:0.9,  stagger:0.06, duration:0.38 }, "-=0.3");
      tl.from(".about-pro-toggle",  { opacity:0, y: 8, scale:0.9,  duration:0.35 }, "-=0.25");
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // Professional mode toggle handler — animate page out, then navigate
  const handleProToggle = () => {
    if (transitioning) return;
    const newMode = !proMode;

    if (newMode) {
      setTransitioning(true);
      const targets = [leftRef.current, rightRef.current].filter(Boolean);
      gsap.to(targets, {
        opacity: 0, scale: 0.92, y: -20, duration: 0.35, ease: "power2.in",
        onComplete: () => {
          setTransitioning(false);
          navigate("/resume");
        },
      });
    } else {
      setProMode(false);
    }
  };

  return (
    <section className="about-page" ref={pageRef} aria-label="About me">

      {/* Background doodles */}
      <div className="about-doodle-layer" aria-hidden="true">
        <style>{`
          @keyframes about-bg-float {
            0%,100% { transform:translateY(0)   rotate(var(--adbr,0deg)); }
            50%      { transform:translateY(-8px) rotate(var(--adbr,0deg)); }
          }
        `}</style>
        {ABOUT_BG.map((d, i) => <BgDoodle key={i} {...d} />)}
      </div>

      {/* ── LEFT CARD ── */}
      <div className="about-card left-card" ref={leftRef}>

        <div className="about-avatar-section">
          <div className="avatar-wrap">
            <div className="avatar-box">
              <img src={me} alt="Charles Cabral" loading="lazy" />
            </div>
            <div className="avatar-sticker">developer<br />+ human</div>
            <div className="avatar-doodle-corner" aria-hidden="true">★</div>
          </div>
        </div>

        <div className="about-identity">
          <h2 className="about-name">Hi, I'm Charles!</h2>
          <div className="about-handle">@Cha2026</div>
        </div>

        <p className="intro">
          I'm the kind of person who's willing to do whatever it takes to build a better life. I'm still in the process of creating who I want to become — and I know that requires knowledge, patience, and continuous growth.
        </p>
        <p className="description">
          My goal is to use technology to help people, ease their struggles, and create solutions that make a meaningful difference. By helping others through innovation, I hope to contribute to a better future.
        </p>

        {/* Skills */}
        <div className="about-skills-row">
          {SKILLS_PREVIEW.map(({ label, Icon }) => (
            <div key={label} className="about-skill-chip">
              <Icon size={13} strokeWidth={2} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <p className="about-hint-text">✦ tap the sticky notes to learn more ✦</p>

        {/* ── PROFESSIONAL MODE TOGGLE — lives exclusively here ── */}
        <ProModeToggle isOn={proMode} onToggle={handleProToggle} />
      </div>

      {/* ── RIGHT CARD — sticky notes ── */}
      <div className="about-card right-card" ref={rightRef}>
        <div className="journal-meta">
          <span>Date: 3/28/2026</span>
          <span>Time: Time of eternity</span>
        </div>

        <div className="about-notes-grid">
          {JOURNAL_NOTES.map((note, i) => (
            <StickyNote key={note.id} note={note} index={i} onOpen={setOpenNote} />
          ))}
        </div>

        <div className="about-bottom-note">
          "still figuring it all out — and that's okay" ✦
        </div>
      </div>

      {/* Note Modal */}
      <NoteModal note={openNote} onClose={() => setOpenNote(null)} />

      <DraggableSideNav />
    </section>
  );
}
