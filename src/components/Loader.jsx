import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onDone }) {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete: onDone });
      timeline
        .from(".loader-grid", { opacity: 0, duration: 0.16 })
        .from(".loader-sheet", { scaleX: 0.1, duration: 0.28, ease: "power3.out" }, 0.08)
        .from(".loader-piece", { opacity: 0, y: 18, scale: 0.7, stagger: 0.07, duration: 0.22 }, 0.2)
        .to(".loader-word", { clipPath: "inset(0 0% 0 0)", duration: 0.32, ease: "power2.out" }, 0.24)
        .to(root.current, { opacity: 0, duration: 0.2, delay: 0.12 });
    }, root);
    return () => ctx.revert();
  }, [onDone]);

  return (
    <div className="site-loader" ref={root} role="status" aria-label="Assembling portfolio">
      <div className="loader-grid" />
      <div className="loader-sheet">
        <span className="loader-piece loader-piece-red" />
        <span className="loader-piece loader-piece-blue" />
        <span className="loader-piece loader-piece-yellow" />
        <strong className="loader-word">CHA.</strong>
      </div>
    </div>
  );
}
