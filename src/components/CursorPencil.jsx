import { useRef, useEffect } from "react";

function CursorPencil() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // ── Resize with DPR ──
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    // ── State ──
    const pts = [];          // circular buffer of {x,y} points
    const MAX_PTS = 28;
    let alpha = 0;           // current ink opacity
    let rafId = null;
    let fadeTimer = null;
    let fadingRaf = null;

    // ── Draw one frame using quadratic bezier through midpoints ──
    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (pts.length < 2 || alpha <= 0) return;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "#155d29";
      ctx.lineWidth = 2.4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "rgba(0,0,0,0.18)";
      ctx.shadowBlur = 1.5;

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);

      // Smooth catmull-rom-style: draw through midpoints
      for (let i = 0; i < pts.length - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      ctx.stroke();
      ctx.restore();
    };

    // ── RAF loop ──
    const loop = () => {
      render();
      rafId = requestAnimationFrame(loop);
    };

    // ── Fade out after idle ──
    const scheduleFade = () => {
      if (fadeTimer) clearTimeout(fadeTimer);
      if (fadingRaf) cancelAnimationFrame(fadingRaf);

      fadeTimer = setTimeout(() => {
        const fade = () => {
          alpha = Math.max(0, alpha - 0.04);
          if (alpha <= 0) { pts.length = 0; return; }
          fadingRaf = requestAnimationFrame(fade);
        };
        fadingRaf = requestAnimationFrame(fade);
      }, 350);
    };

    // ── Mouse handler ──
    const handleMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      pts.push({ x, y });
      if (pts.length > MAX_PTS) pts.shift();
      alpha = 0.75;
      scheduleFade();
    };

    const handleLeave = () => {
      alpha = 0;
      pts.length = 0;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      if (rafId) cancelAnimationFrame(rafId);
      if (fadingRaf) cancelAnimationFrame(fadingRaf);
      if (fadeTimer) clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        pointerEvents: "none",
        zIndex: 99999,
      }}
    />
  );
}

export default CursorPencil;
