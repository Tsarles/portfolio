import { useEffect, useState, useRef } from "react";

/*
  Signature SVG — hand-crafted bezier paths that spell out
  "Tsarles" in a flowing cursive style, animated as if
  a pen is signing the page.

  We use pathLength="1" on each path so dashoffset animates
  cleanly from 1 → 0 regardless of actual pixel length.
*/

export default function Loader({ onDone }) {
  const [phase, setPhase] = useState("signing"); // "signing" | "fadeout"
  const svgRef = useRef(null);

  useEffect(() => {
    // Total signing animation takes ~2.4s, then we fade
    const t1 = setTimeout(() => setPhase("fadeout"), 2600);
    const t2 = setTimeout(() => { if (onDone) onDone(); }, 3300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#f4f1e9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        opacity: phase === "fadeout" ? 0 : 1,
        transition: "opacity 0.7s ease",
        pointerEvents: phase === "fadeout" ? "none" : "auto",
      }}
    >
      {/* ── Signature SVG ── */}
      <svg
        ref={svgRef}
        viewBox="0 0 520 160"
        width="340"
        height="105"
        style={{ overflow: "visible" }}
        aria-label="Tsarles signature"
      >
        {/*
          Path 1 — "T" capital + flowing into "s"
          Starts with a horizontal bar, then vertical, then curves into s
        */}
        <path
          pathLength="1"
          d="
            M 28,42 C 55,38 82,36 98,38
            M 63,38 C 63,55 63,72 60,88
            C 58,100 52,110 60,108
            C 72,106 80,95 85,85
            C 90,75 86,68 92,70
            C 100,73 98,84 104,82
          "
          fill="none"
          stroke="#06771f"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: "sig-draw 0.6s cubic-bezier(0.4,0,0.2,1) 0.15s forwards",
          }}
        />

        {/*
          Path 2 — "a" loop into "r"
        */}
        <path
          pathLength="1"
          d="
            M 108,72
            C 118,60 132,58 134,70
            C 136,82 126,90 118,87
            C 110,84 112,76 122,78
            C 132,80 136,88 145,82
            C 150,78 150,68 156,64
            C 160,60 166,62 165,70
          "
          fill="none"
          stroke="#06771f"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: "sig-draw 0.55s cubic-bezier(0.4,0,0.2,1) 0.7s forwards",
          }}
        />

        {/*
          Path 3 — "l" tall then "e"
        */}
        <path
          pathLength="1"
          d="
            M 168,50
            C 168,62 168,75 166,88
            C 165,96 162,104 168,102
            C 175,100 182,90 186,80
            C 188,73 184,68 190,68
            C 198,68 200,76 196,82
            C 192,88 184,90 190,88
            C 198,86 206,80 210,74
          "
          fill="none"
          stroke="#06771f"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: "sig-draw 0.55s cubic-bezier(0.4,0,0.2,1) 1.2s forwards",
          }}
        />

        {/*
          Path 4 — "s" into long flowing tail underline
        */}
        <path
          pathLength="1"
          d="
            M 212,70
            C 218,60 228,62 228,72
            C 228,82 218,86 222,82
            C 228,77 238,80 238,88
            C 238,96 228,100 236,96
            C 248,90 260,78 290,78
            C 330,78 370,88 410,80
            C 440,74 460,65 478,62
          "
          fill="none"
          stroke="#06771f"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: "sig-draw 0.65s cubic-bezier(0.4,0,0.2,1) 1.7s forwards",
          }}
        />

        {/*
          Path 5 — underline swoosh beneath the whole name
        */}
        <path
          pathLength="1"
          d="
            M 22,120
            C 80,132 180,128 280,130
            C 370,132 430,124 480,116
          "
          fill="none"
          stroke="#06771f"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: "sig-draw 0.5s cubic-bezier(0.4,0,0.2,1) 2.3s forwards",
          }}
        />

        {/* ── @Tsarles2026 tiny label that fades in after signing ── */}
        <text
          x="490"
          y="118"
          textAnchor="end"
          fontSize="11"
          fontFamily="'Architects Daughter', cursive"
          fill="#06771f"
          opacity="0"
          style={{
            animation: "sig-label-in 0.4s ease 2.7s forwards",
          }}
        >
          @Tsarles2026
        </text>
      </svg>

      {/* ── Ink dots below ── */}
      <div
        style={{
          display: "flex",
          gap: 8,
          opacity: 0,
          animation: "sig-dots-in 0.3s ease 0.6s forwards",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#06771f",
              display: "block",
              opacity: 0.3,
              animation: `sig-dot-pulse 1.1s ease-in-out ${0.6 + i * 0.18}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes sig-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes sig-label-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 0.7; transform: translateY(0); }
        }
        @keyframes sig-dots-in {
          to { opacity: 1; }
        }
        @keyframes sig-dot-pulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.25); }
        }
      `}</style>
    </div>
  );
}
