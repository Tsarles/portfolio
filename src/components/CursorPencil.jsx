import { useRef, useEffect } from "react";

function CursorPencil() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const pts   = [];
    const MAX_PTS = 26;
    let alpha     = 0;
    let rafId     = null;
    let fadeTimer = null;
    let fadingRaf = null;

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (pts.length < 2 || alpha <= 0) return;

      ctx.save();
      ctx.globalAlpha  = alpha;
      ctx.strokeStyle  = "#155d29";
      ctx.lineWidth    = 2.2;
      ctx.lineCap      = "round";
      ctx.lineJoin     = "round";

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 0; i < pts.length - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      ctx.stroke();
      ctx.restore();
    };

    const loop = () => { render(); rafId = requestAnimationFrame(loop); };

    const scheduleFade = () => {
      if (fadeTimer)  clearTimeout(fadeTimer);
      if (fadingRaf)  cancelAnimationFrame(fadingRaf);
      fadeTimer = setTimeout(() => {
        const fade = () => {
          alpha = Math.max(0, alpha - 0.05);
          if (alpha <= 0) { pts.length = 0; return; }
          fadingRaf = requestAnimationFrame(fade);
        };
        fadingRaf = requestAnimationFrame(fade);
      }, 300);
    };

    const addPoint = (x, y) => {
      pts.push({ x, y });
      if (pts.length > MAX_PTS) pts.shift();
      alpha = 0.72;
      scheduleFade();
    };

    // Mouse
    const onMouseMove = (e) => addPoint(e.clientX, e.clientY);
    const onMouseLeave = () => { alpha = 0; pts.length = 0; };

    // Touch — finger drawing on mobile
    const onTouchMove = (e) => {
      const t = e.touches[0];
      addPoint(t.clientX, t.clientY);
    };
    const onTouchEnd = () => scheduleFade();

    resize();
    window.addEventListener("resize",     resize,       { passive: true });
    window.addEventListener("mousemove",  onMouseMove,  { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove",  onTouchMove,  { passive: true });
    window.addEventListener("touchend",   onTouchEnd,   { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("touchend",   onTouchEnd);
      if (rafId)    cancelAnimationFrame(rafId);
      if (fadingRaf) cancelAnimationFrame(fadingRaf);
      if (fadeTimer) clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", top: 0, left: 0,
        pointerEvents: "none",
        zIndex: 99999,
      }}
    />
  );
}

export default CursorPencil;
