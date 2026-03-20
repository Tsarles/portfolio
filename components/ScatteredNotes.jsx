const DESKTOP_NOTES = [
  { t: "Halo Semuanya",   x: 2,  y: 10, r: -10, c: "#fef9c3", s: 13, d: 6.0, dl: 0   },
  { t: "Cha",             x: 83, y: 7,  r:  8,  c: "#fce7f3", s: 26, d: 5.5, dl: 0.6 },
  { t: "Salamat po",      x: 1,  y: 54, r: -5,  c: "#d1fae5", s: 12, d: 5.8, dl: 1.0 },
  { t: "Selamat datang!", x: 77, y: 70, r:  8,  c: "#fef9c3", s: 12, d: 6.2, dl: 0.4 },
  { t: "I wanted to try\nseashell foods\nbut cant : ((",
                          x: 84, y: 36, r: -6,  c: "#fce7f3", s: 11, d: 7.0, dl: 1.8 },
  { t: "still figuring\nthings out :)",
                          x: 1,  y: 32, r:  5,  c: "#e0f2fe", s: 12, d: 5.2, dl: 0.8 },
  { t: "be happy!",       x: 14, y: 3,  r: -8,  c: "#d1fae5", s: 13, d: 5.0, dl: 0.3 },
  { t: "made with\nlove :)",
                          x: 66, y: 90, r: -3,  c: "#fce7f3", s: 11, d: 6.5, dl: 2.0 },
];

const MOBILE_NOTES = [
  { t: "Halo Semuanya",   r: -5,  c: "#fef9c3" },
  { t: "Cha",             r:  6,  c: "#fce7f3" },
  { t: "Salamat po",      r: -3,  c: "#d1fae5" },
  { t: "Selamat datang!", r:  8,  c: "#fef9c3" },
];

const KF = `
  @keyframes sn-in {
    from { opacity:0; transform:rotate(var(--r)) scale(0.9) translateY(8px); }
    to   { opacity:1; transform:rotate(var(--r)) translateY(0); }
  }
  @keyframes sn-float {
    0%,100% { transform:rotate(var(--r)) translateY(0);   }
    50%      { transform:rotate(var(--r)) translateY(-6px); }
  }
`;

const Corner = ({ style: extra }) => (
  <span style={{
    position:"absolute", bottom:0, right:0,
    borderWidth:"0 0 8px 8px", borderStyle:"solid",
    borderColor:"transparent transparent rgba(0,0,0,0.09) transparent",
    ...extra,
  }}/>
);

export default function ScatteredNotes({ mobile = false }) {
  if (mobile) {
    return (
      <div style={{
        display:"grid", gridTemplateColumns:"1fr 1fr",
        gap:"10px",
        width:"100%",
        marginTop: 12,
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
            fontSize:13,
            color:"#2a2a2a",
            lineHeight:1.45,
            opacity:0.9,
            boxShadow:"2px 2px 0 rgba(0,0,0,0.09)",
            position:"relative",
            animation:`sn-in 0.4s ease ${i*0.08}s both, sn-float ${5+i*0.5}s ease-in-out ${i*0.4}s infinite`,
          }}>
            {n.t}
            <Corner />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div aria-hidden="true" style={{
      position:"fixed", inset:0, zIndex:1,
      pointerEvents:"none", overflow:"hidden",
    }}>
      <style>{KF}</style>
      {DESKTOP_NOTES.map((n, i) => (
        <div key={i} style={{
          position:"absolute",
          left:`${n.x}%`, top:`${n.y}%`,
          "--r":`${n.r}deg`,
          background:n.c, fontSize:n.s,
          padding:"7px 12px",
          border:"2px solid rgba(0,0,0,0.48)",
          borderRadius:"3px",
          fontFamily:"'Architects Daughter',cursive",
          color:"#2a2a2a",
          lineHeight:1.5, whiteSpace:"pre-wrap",
          maxWidth:145, opacity:0.78,
          boxShadow:"3px 3px 0 rgba(0,0,0,0.08)",
          willChange:"transform",
          animation:`sn-in 0.4s ease ${i*0.09}s both, sn-float ${n.d}s ease-in-out ${n.dl}s infinite`,
        }}>
          {n.t}
          <Corner />
        </div>
      ))}
    </div>
  );
}
