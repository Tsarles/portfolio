/*
  ScatteredNotes — fixed background layer (z-index: 1)
  Feels unorganized but never clutters the center content area.
  Mobile: only 4 corner notes, smaller, pushed to edges.
*/

// m: true = show on mobile, pos adjusted per breakpoint via data-mobile attrs
const NOTES = [
  // Desktop corners / edges — enough breathing room from center
  { t: "Halo Semuanya",    x: 1,  y: 8,  r: -10, c: "#fef9c3", s: 13, d: 6.0, dl: 0,   mobile: true,  mx: 0,  my: 20 },
  { t: "Cha",              x: 83, y: 6,  r: 8,   c: "#fce7f3", s: 26, d: 5.5, dl: 0.6, mobile: true,  mx: 80, my: 20 },
  { t: "Salamat po",       x: 0,  y: 52, r: -5,  c: "#d1fae5", s: 12, d: 5.8, dl: 1.0, mobile: false, mx: 0,  my: 50 },
  { t: "Selamat datang!",  x: 78, y: 68, r: 8,   c: "#fef9c3", s: 12, d: 6.2, dl: 0.4, mobile: true,  mx: 76, my: 70 },
  { t: "I wanted to try\nseashell foods\nbut cant : ((",
                           x: 84, y: 36, r: -6,  c: "#fce7f3", s: 11, d: 7.0, dl: 1.8, mobile: false, mx: 82, my: 40 },
  { t: "still figuring\nthings out :)",
                           x: 0,  y: 30, r: 5,   c: "#e0f2fe", s: 12, d: 5.2, dl: 0.8, mobile: false, mx: 0,  my: 32 },
  { t: "be happy!",        x: 14, y: 3,  r: -8,  c: "#d1fae5", s: 13, d: 5.0, dl: 0.3, mobile: true,  mx: 12, my: 22 },
  { t: "made with\nlove :)",
                           x: 66, y: 90, r: -3,  c: "#fce7f3", s: 11, d: 6.5, dl: 2.0, mobile: false, mx: 60, my: 88 },
];

export default function ScatteredNotes() {
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
  const list = isMobile ? NOTES.filter(n => n.mobile) : NOTES;

  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}
    >
      <style>{`
        @keyframes sn-in {
          from { opacity: 0; transform: rotate(var(--r)) scale(0.88) translateY(10px); }
          to   { opacity: 1; transform: rotate(var(--r)) translateY(0); }
        }
        @keyframes sn-float {
          0%,100% { transform: rotate(var(--r)) translateY(0);   }
          50%      { transform: rotate(var(--r)) translateY(-7px); }
        }
      `}</style>

      {list.map((n, i) => {
        const x = isMobile ? n.mx : n.x;
        const y = isMobile ? n.my : n.y;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              "--r": `${n.r}deg`,
              background: n.c,
              fontSize: isMobile ? Math.max(10, n.s - 1) : n.s,
              padding: isMobile ? "5px 9px" : "7px 12px",
              border: "2px solid rgba(0,0,0,0.48)",
              borderRadius: "3px",
              fontFamily: "'Architects Daughter', cursive",
              color: "#2a2a2a",
              lineHeight: 1.5,
              whiteSpace: "pre-wrap",
              maxWidth: isMobile ? 120 : 145,
              opacity: 0.76,
              boxShadow: "3px 3px 0 rgba(0,0,0,0.08)",
              willChange: "transform",
              animation: `sn-in 0.4s ease ${i * 0.09}s both, sn-float ${n.d}s ease-in-out ${n.dl}s infinite`,
            }}
          >
            {n.t}
            <span style={{
              position: "absolute", bottom: 0, right: 0,
              borderWidth: "0 0 8px 8px", borderStyle: "solid",
              borderColor: "transparent transparent rgba(0,0,0,0.10) transparent",
            }} />
          </div>
        );
      })}
    </div>
  );
}
