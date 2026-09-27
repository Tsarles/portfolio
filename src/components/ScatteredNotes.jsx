const DESKTOP_NOTES = [
  { t: "Halo Semuanya",                       x: 1,  y: 9,  r: -10, c: "#fff1a9", s: 13, d: 5.8, dl: 0   },
  { t: "Cha",                                  x: 86, y: 8,  r:  8,  c: "#cfe8ff", s: 26, d: 5.2, dl: 0.6 },
  { t: "Salamat po",                           x: 1,  y: 56, r: -5,  c: "#c7ead6", s: 12, d: 5.6, dl: 1.0 },
  { t: "Selamat datang!",                      x: 82, y: 72, r:  8,  c: "#fff1a9", s: 12, d: 6.0, dl: 0.4 },
  { t: "I wanted to try\nseashell foods\nbut cant : ((",
                                               x: 87, y: 37, r: -6,  c: "#ffd8d2", s: 11, d: 6.8, dl: 1.8 },
  { t: "still figuring\nthings out :)",        x: 1,  y: 32, r:  5,  c: "#cfe8ff", s: 12, d: 5.0, dl: 0.8 },
  { t: "be happy!",                            x: 15, y: 3,  r: -8,  c: "#c7ead6", s: 13, d: 4.8, dl: 0.3 },
  { t: "made with\nlove :)",                   x: 68, y: 91, r: -3,  c: "#ffd8d2", s: 11, d: 6.3, dl: 2.0 },
];

// All 8 notes shown on mobile in two columns, each tilted differently
const MOBILE_NOTES = [
  { t: "Halo Semuanya",                        r: -5, c: "#fef9c3" },
  { t: "Cha",                                  r:  6, c: "#cfe8ff" },
  { t: "Salamat po",                           r: -3, c: "#d1fae5" },
  { t: "Selamat datang!",                      r:  7, c: "#fef9c3" },
  { t: "still figuring\nthings out :)",        r: -6, c: "#e0f2fe" },
  { t: "be happy!",                            r:  4, c: "#d1fae5" },
  { t: "I wanted to try\nseashell foods\nbut cant : ((",
                                               r: -4, c: "#ffd8d2" },
  { t: "made with love :)",                    r:  5, c: "#ffd8d2" },
];

const KF = `
  @keyframes sn-in {
    from { opacity:0; transform:rotate(var(--r)) scale(0.88) translateY(10px); }
    to   { opacity:1; transform:rotate(var(--r)) translateY(0); }
  }
  @keyframes sn-float {
    0%,100% { transform:rotate(var(--r)) translateY(0);   }
    50%      { transform:rotate(var(--r)) translateY(-6px); }
  }
`;

const Corner = () => (
  <span style={{
    position:"absolute", bottom:0, right:0,
    borderWidth:"0 0 8px 8px", borderStyle:"solid",
    borderColor:"transparent transparent rgba(0,0,0,0.09) transparent",
  }}/>
);

export default function ScatteredNotes({ mobile = false }) {
  if (mobile) {
    return (
      <div style={{
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gap:"10px",
        width:"100%",
        marginTop: 10,
        pointerEvents:"none",
      }}>
        <style>{KF}</style>
        {MOBILE_NOTES.map((n, i) => (
          <div key={i} style={{
            "--r":`${n.r}deg`,
            background: n.c,
            padding:"9px 12px",
            border:"2px solid rgba(0,0,0,0.48)",
            borderRadius:"4px",
            fontFamily:"'Architects Daughter',cursive",
            fontSize: 12,
            color:"#2a2a2a",
            lineHeight:1.45,
            opacity:0.92,
            boxShadow:"2px 2px 0 rgba(0,0,0,0.09)",
            position:"relative",
            animation:`sn-in 0.4s ease ${i*0.07}s both, sn-float ${5+i*0.4}s ease-in-out ${i*0.35}s infinite`,
          }}>
            {n.t}
            <Corner/>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div aria-hidden="true" style={{
      position:"fixed", inset:0, zIndex:0,
      pointerEvents:"none", overflow:"hidden",
    }}>
      <style>{KF}</style>
      {DESKTOP_NOTES.map((n, i) => (
        <div key={i} style={{
          position:"absolute", left:`${n.x}%`, top:`${n.y}%`,
          "--r":`${n.r}deg`, background:n.c, fontSize:n.s,
          padding:"7px 12px", border:"2px solid rgba(0,0,0,0.48)",
          borderRadius:"3px", fontFamily:"'Architects Daughter',cursive",
          color:"#2a2a2a", lineHeight:1.5, whiteSpace:"pre-wrap",
          maxWidth:145, opacity:0.78,
          boxShadow:"3px 3px 0 rgba(0,0,0,0.08)", willChange:"transform",
          animation:`sn-in 0.4s ease ${i*0.09}s both, sn-float ${n.d}s ease-in-out ${n.dl}s infinite`,
        }}>
          {n.t}
          <Corner/>
        </div>
      ))}
    </div>
  );
}
