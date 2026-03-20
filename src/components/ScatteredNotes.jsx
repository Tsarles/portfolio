/*
  ScatteredNotes — rendered as a fixed background layer (z-index: 1)
  so they never overlap nav icons, cards, or interactive elements.
  Intentionally unorganized: random-feeling positions, sizes, rotations.
*/

const NOTES = [
  // text, left%, top%, rot(deg), color, size(px), floatDur, floatDelay
  { t: "Halo Semuanya",                    x: 3,   y: 9,   r: -11, c: "#fef9c3", s: 14, d: 5.2, dl: 0    },
  { t: "Cha",                              x: 81,  y: 7,   r: 7,   c: "#fce7f3", s: 28, d: 6.0, dl: 0.7  },
  { t: "Salamat po",                       x: 2,   y: 55,  r: -6,  c: "#d1fae5", s: 13, d: 4.8, dl: 1.2  },
  { t: "Selamat\ndatang!",                 x: 77,  y: 66,  r: 9,   c: "#fef9c3", s: 13, d: 5.5, dl: 0.4  },
  { t: "I wanted to try\nseashell foods\nbut cant : ((",
                                           x: 84,  y: 38,  r: -7,  c: "#fce7f3", s: 12, d: 6.3, dl: 1.8  },
  { t: "still figuring\nthings out :)",    x: 1,   y: 33,  r: 5,   c: "#e0f2fe", s: 13, d: 5.0, dl: 0.9  },
  { t: "Open to\ncollab!",                 x: 88,  y: 14,  r: -5,  c: "#d1fae5", s: 13, d: 5.8, dl: 1.5  },
  { t: "enjoy to discover\nstuff abt me!",x: 3,   y: 80,  r: 14,  c: "#fef9c3", s: 12, d: 4.6, dl: 0.3  },
  { t: "made with\nlove :)",               x: 68,  y: 87,  r: -4,  c: "#fce7f3", s: 12, d: 6.8, dl: 2.1  },
  { t: "be happy!",                        x: 17,  y: 4,   r: -9,  c: "#d1fae5", s: 15, d: 5.3, dl: 0.6  },
  { t: "hello world",                      x: 55,  y: 3,   r: 4,   c: "#e0f2fe", s: 11, d: 7.0, dl: 2.4  },
  { t: "✦",                               x: 91,  y: 53,  r: 15,  c: "#fef9c3", s: 22, d: 4.2, dl: 1.1  },
  { t: "coffee +\ncode",                   x: 73,  y: 2,   r: -3,  c: "#d1fae5", s: 12, d: 5.6, dl: 1.9  },
  { t: "idk what\nim doing",               x: 5,   y: 91,  r: 8,   c: "#fce7f3", s: 11, d: 6.1, dl: 0.5  },
  { t: "✿",                               x: 44,  y: 95,  r: -5,  c: "#fef9c3", s: 24, d: 5.9, dl: 1.3  },
];

export default function ScatteredNotes() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,          // behind hero card (z-index 10+) but above bg doodles (z-index 0)
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes sn-float {
          0%,100% { transform: rotate(var(--r)) translateY(0); }
          50%      { transform: rotate(var(--r)) translateY(-9px); }
        }
        @keyframes sn-in {
          from { opacity:0; transform: rotate(var(--r)) scale(0.85) translateY(12px); }
          to   { opacity:1; transform: rotate(var(--r)) scale(1)    translateY(0); }
        }
      `}</style>

      {NOTES.map((n, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${n.x}%`,
            top:  `${n.y}%`,
            "--r": `${n.r}deg`,
            background: n.c,
            fontSize: n.s,
            padding: "8px 13px",
            border: "2px solid rgba(0,0,0,0.55)",
            borderRadius: "4px",
            fontFamily: "'Architects Daughter', cursive",
            color: "#2a2a2a",
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
            maxWidth: 155,
            opacity: 0.82,
            boxShadow: "3px 3px 0 rgba(0,0,0,0.10)",
            animation: `sn-in 0.5s ease ${i * 0.12}s both, sn-float ${n.d}s ease-in-out ${n.dl}s infinite`,
            willChange: "transform",
          }}
        >
          {n.t}
          {/* folded corner */}
          <span style={{
            position:"absolute", bottom:0, right:0,
            borderWidth:"0 0 10px 10px", borderStyle:"solid",
            borderColor:`transparent transparent rgba(0,0,0,0.13) transparent`,
          }} />
        </div>
      ))}
    </div>
  );
}
