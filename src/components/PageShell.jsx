import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Navigation from "./Navigation";

export default function PageShell({ children, pageClass = "", label }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        opacity: 0,
        y: 22,
        rotation: (index) => (index % 2 ? 0.8 : -0.8),
        duration: 0.55,
        stagger: 0.07,
        ease: "back.out(1.2)",
        clearProps: "transform",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className={`site-shell ${pageClass}`} ref={root}>
      <Navigation />
      <div className="ambient-note ambient-note-one" aria-hidden="true">small steps<br />still count</div>
      <div className="ambient-note ambient-note-two" aria-hidden="true">ideas → drafts<br />→ better ideas</div>
      <main className="page-canvas" aria-label={label}>{children}</main>
    </div>
  );
}
