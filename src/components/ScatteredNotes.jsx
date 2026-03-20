/*
  ScatteredNotes — fixed background layer (z-index: 1)
  Fewer notes, cleaner but still deliberately unorganized.
  Mobile: only corner notes so center stays usable.
*/

// Desktop: 8 notes. Mobile subset marked with m:true
const NOTES = [
  { t: "Halo Semuanya",                 x: 2,   y: 8,   r: -10, c: "#fef9c3", s: 13, d: 6.0, dl: 0,   m: true  },
  { t: "Cha",                           x: 82,  y: 6,   r: 8,   c: "#fce7f3", s: 26, d: 5.5, dl: 0.6, m: true  },
  { t: "Salamat po",                    x: 1,   y: 56,  r: -5,  c: "#d1fae5", s: 12, d: 5.8, dl: 1.0, m: false },
  { t: "Selamat datang!",               x: 76,  y: 68,  r: 8,   c: "#fef9c3", s: 12, d: 6.2, dl: 0.4, m: true  },
  { t: "I wanted to try\nseashell foods\nbut cant : ((",
                                        x: 83,  y: 36,  r: -6,  c: "#fce7f3", s: 11, d: 7.0, dl: 1.8, m: false },
  { t: "still figuring\nthings out :)", x: 1,   y: 30,  r: 5,   c: "#e0f2fe", s: 12, d: 5.2, dl: 0.8, m: false },
  { t: "be happy!",                     x: 16,  y: 3,   r: -8,  c: "#d1fae5", s: 13, d: 5.0, dl: 0.3, m: true  },
  { t: "made with love :)",             x: 66,  y: 90,  r: -3,  c: "#fce7f3", s: 11, d: 6.5, dl: 2.0, m: false },
];

export default function ScatteredNotes() {
  // Detect mobile via matchMedia — purely for picking which notes to show
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const visible = isMobile ? NOTES.filter(n => n.m) : NOTES;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed", inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes sn-in {
          from { opacity: 0; transform: rotate(var(--r)) scale(0.88) translateY(10px); }
          to   { opacity: 1; transform: rotate(var(--r)) scale(1)    translateY(0);    }
        }
        @keyframes sn-float {
          0%,100% { transform: rotate(var(--r)) translateY(0);   }
          50%      { transform: rotate(var(--r)) translateY(-7px); }
        }
      `}</style>

      {visible.map((n, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${n.x}%`,
            top:  `${n.y}%`,
            "--r": `${n.r}deg`,
            background: n.c,
            fontSize: n.s,
            padding: "7px 12px",
            border: "2px solid rgba(0,0,0,0.5)",
            borderRadius: "3px",
            fontFamily: "'Architects Daughter', cursive",
            color: "#2a2a2a",
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
            maxWidth: 145,
            opacity: 0.78,
            boxShadow: "3px 3px 0 rgba(0,0,0,0.09)",
            willChange: "transform",
            animation: `sn-in 0.45s ease ${i * 0.1}s both, sn-float ${n.d}s ease-in-out ${n.dl}s infinite`,
          }}
        >
          {n.t}
          <span style={{
            position: "absolute", bottom: 0, right: 0,
            borderWidth: "0 0 9px 9px", borderStyle: "solid",
            borderColor: "transparent transparent rgba(0,0,0,0.11) transparent",
          }} />
        </div>
      ))}
    </div>
  );
}
