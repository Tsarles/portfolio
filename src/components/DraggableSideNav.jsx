import { useState, useRef, useEffect } from "react";
import Navigation from "./Navigation";

function DraggableSideNav() {
  const [navVisible, setNavVisible] = useState(false);
  const [noteHidden, setNoteHidden] = useState(false);

  const navRef = useRef(null);
  const position = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const getClientPos = (e) => {
    if (e.touches && e.touches.length) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const startDrag = (e) => {
      const pos = getClientPos(e);
      dragging.current = true;
      hasMoved.current = false;
      offset.current = {
        x: pos.x - position.current.x,
        y: pos.y - position.current.y,
      };
      document.body.style.userSelect = "none";
    };

    const moveDrag = (e) => {
      if (!dragging.current) return;
      if (e.cancelable) e.preventDefault();
      const pos = getClientPos(e);
      const newX = pos.x - offset.current.x;
      const newY = pos.y - offset.current.y;
      if (Math.abs(newX - position.current.x) > 2 || Math.abs(newY - position.current.y) > 2) {
        hasMoved.current = true;
      }
      position.current = { x: newX, y: newY };
      nav.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
    };

    const endDrag = () => {
      if (dragging.current && hasMoved.current) {
        setNoteHidden(true);
      }
      dragging.current = false;
      document.body.style.userSelect = "auto";
    };

    const handleMouseDown = (e) => {
      startDrag(e);
    };
    const handleTouchStart = (e) => {
      startDrag(e);
    };

    nav.addEventListener("mousedown", handleMouseDown);
    nav.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("mousemove", moveDrag);
    window.addEventListener("touchmove", moveDrag, { passive: false });
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchend", endDrag);

    return () => {
      nav.removeEventListener("mousedown", handleMouseDown);
      nav.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("mousemove", moveDrag);
      window.removeEventListener("touchmove", moveDrag);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchend", endDrag);
    };
  }, []);

  return (
    <div
      ref={navRef}
      className={`mobile-side-nav ${navVisible ? "show" : "hide"}`}
      style={{ position: "fixed", top: "50%", right: "20px", zIndex: 9999 }}
    >
      {!noteHidden && (
        <div
          className="drag-me-note"
          style={{
            textAlign: "center",
            fontSize: "0.85rem",
            marginBottom: "8px",
            color: "#06771f",
            fontWeight: "bold",
          }}
        >
          You can drag me!
        </div>
      )}

      <button
        className="side-nav-toggle"
        onClick={() => setNavVisible(!navVisible)}
      >
        {navVisible ? "×" : "☰"}
      </button>

      <div className="about-side-nav">
        <Navigation variant="side" />
      </div>
    </div>
  );
}

export default DraggableSideNav;
