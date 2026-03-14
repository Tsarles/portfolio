import { useRef, useEffect } from "react";

function CursorPencil() {
  const canvasRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const clearIntervalRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    };

    const getCoords = (e) => ({
      x: e.clientX,
      y: e.clientY,
    });

    const getCoordsTouch = (e) => {
      if (!e.touches || !e.touches.length) return lastPos.current;
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const draw = (x, y) => {
      if (!ctx) return;
      const pos = { x, y };
      if (hasMoved.current) {
        ctx.globalAlpha = 0.72;
        ctx.strokeStyle = "#155d29";
        ctx.shadowColor = "rgba(0, 0, 0, 0.12)";
        ctx.shadowBlur = 1;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
      hasMoved.current = true;
      lastPos.current = pos;
    };

    const clearCanvas = () => {
      if (!ctx || !canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
    };

    const handleMouseMove = (e) => {
      draw(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const { x, y } = getCoordsTouch(e);
      draw(x, y);
    };

    const resetTrail = () => {
      hasMoved.current = false;
    };

    resize();
    window.addEventListener("resize", resize);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", resetTrail);

    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchstart", resetTrail);

    clearIntervalRef.current = setInterval(clearCanvas, 320);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", resetTrail);
      canvas.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", resetTrail);
      if (clearIntervalRef.current) clearInterval(clearIntervalRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-pencil-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
      }}
    />
  );
}

export default CursorPencil;
