const DOODLES = [
  { t:"star4",    x:4,   y:8,   s:18, r:15,  d:5.5, dl:0,   o:0.15 },
  { t:"star6",    x:94,  y:5,   s:14, r:-20, d:6.0, dl:1.2, o:0.12 },
  { t:"circle",   x:88,  y:22,  s:16, r:0,   d:7.0, dl:0.5, o:0.10 },
  { t:"squiggle", x:7,   y:35,  s:28, r:10,  d:6.5, dl:2.0, o:0.12 },
  { t:"cross",    x:91,  y:45,  s:14, r:30,  d:5.0, dl:0.8, o:0.13 },
  { t:"heart",    x:3,   y:58,  s:16, r:-8,  d:7.0, dl:1.5, o:0.11 },
  { t:"star4",    x:96,  y:68,  s:12, r:45,  d:5.8, dl:0.3, o:0.12 },
  { t:"circle",   x:5,   y:80,  s:20, r:0,   d:6.2, dl:2.5, o:0.09 },
  { t:"arrow",    x:90,  y:82,  s:22, r:-15, d:6.8, dl:1.0, o:0.11 },
  { t:"star6",    x:8,   y:94,  s:15, r:10,  d:5.5, dl:1.8, o:0.13 },
  { t:"squiggle", x:92,  y:92,  s:24, r:-5,  d:7.2, dl:0.7, o:0.10 },
  { t:"cross",    x:48,  y:3,   s:12, r:20,  d:5.0, dl:2.2, o:0.09 },
  { t:"heart",    x:52,  y:97,  s:14, r:5,   d:6.5, dl:0.4, o:0.09 },
  { t:"star4",    x:20,  y:12,  s:10, r:30,  d:5.2, dl:1.3, o:0.08 },
  { t:"circle",   x:78,  y:15,  s:11, r:0,   d:7.5, dl:2.8, o:0.08 },
  { t:"squiggle", x:18,  y:88,  s:20, r:-12, d:6.0, dl:0.9, o:0.08 },
  { t:"cross",    x:74,  y:90,  s:13, r:45,  d:5.5, dl:1.6, o:0.10 },
];

function Star4({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M10,2 L11.5,8.5 L18,10 L11.5,11.5 L10,18 L8.5,11.5 L2,10 L8.5,8.5 Z" />
    </svg>
  );
}
function Star6({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M10,1 L11.8,7.5 L18,6 L13.5,10.5 L16,17 L10,13.5 L4,17 L6.5,10.5 L2,6 L8.2,7.5 Z" />
    </svg>
  );
}
function Circle({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="10" cy="10" r="7" />
    </svg>
  );
}
function Cross({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="10" y1="3" x2="10" y2="17" />
      <line x1="3" y1="10" x2="17" y2="10" />
    </svg>
  );
}
function Heart({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10,16 C10,16 3,11 3,7 A4,4 0 0,1 10,6 A4,4 0 0,1 17,7 C17,11 10,16 10,16 Z" />
    </svg>
  );
}
function Squiggle({ size }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 40 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M2,9 C6,3 12,15 18,9 C24,3 30,15 36,9 C38,7 39,8 40,9" />
    </svg>
  );
}
function Arrow({ size }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 36 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2,10 C8,10 26,10 34,10" />
      <path d="M26,4 L34,10 L26,16" />
    </svg>
  );
}

const SHAPES = { star4: Star4, star6: Star6, circle: Circle, cross: Cross, heart: Heart, squiggle: Squiggle, arrow: Arrow };

export default function DoodleBackground() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0,
      pointerEvents: "none", overflow: "hidden",
      color: "#155d29",
    }}>
      <style>{`
        @keyframes doodle-bob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes doodle-sway {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-8px) rotate(3deg); }
          66%       { transform: translateY(-4px) rotate(-2deg); }
        }
        @keyframes doodle-pulse {
          0%, 100% { opacity: var(--do); transform: scale(1); }
          50%       { opacity: calc(var(--do) * 1.5); transform: scale(1.08); }
        }
      `}</style>
      {DOODLES.map((d, i) => {
        const Shape = SHAPES[d.t];
        const anim = i % 3 === 0 ? "doodle-sway" : i % 3 === 1 ? "doodle-bob" : "doodle-pulse";
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${d.x}%`,
              top: `${d.y}%`,
              opacity: d.o,
              "--do": d.o,
              transform: `rotate(${d.r}deg)`,
              animation: `${anim} ${d.d}s ease-in-out ${d.dl}s infinite`,
              willChange: "transform, opacity",
            }}
          >
            <Shape size={d.s} />
          </div>
        );
      })}
    </div>
  );
}
