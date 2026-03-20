import { useState, useRef, useEffect } from "react";
import Navigation from "./Navigation";

function DraggableSideNav() {
  const [navVisible, setNavVisible] = useState(false);
  const [noteHidden, setNoteHidden] = useState(false);

  const wrapRef = useRef(null);
  const position = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const didToggle = useRef(false);

  const getClientPos = (e) => {
    if (e.touches && e.touches.length) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const startDrag = (e) => {
      const pos = getClientPos(e);
      dragging.current = true;
      hasMoved.current = false;
      didToggle.current = false;
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
      if (Math.abs(newX - position.current.x) > 3 || Math.abs(newY - position.current.y) > 3) {
        hasMoved.current = true;
      }
      position.current = { x: newX, y: newY };
      wrap.style.setProperty("--drag-x", `${newX}px`);
      wrap.style.setProperty("--drag-y", `${newY}px`);
    };

    const endDrag = () => {
      if (dragging.current && hasMoved.current) {
        setNoteHidden(true);
      }
      dragging.current = false;
      document.body.style.userSelect = "auto";
    };

    wrap.addEventListener("mousedown", startDrag);
    wrap.addEventListener("touchstart", startDrag, { passive: true });
    window.addEventListener("mousemove", moveDrag);
    window.addEventListener("touchmove", moveDrag, { passive: false });
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchend", endDrag);

    return () => {
      wrap.removeEventListener("mousedown", startDrag);
      wrap.removeEventListener("touchstart", startDrag);
      window.removeEventListener("mousemove", moveDrag);
      window.removeEventListener("touchmove", moveDrag);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchend", endDrag);
    };
  }, []);

  const handleToggle = (e) => {
    // Only toggle if we didn't just drag
    if (!hasMoved.current) {
      setNavVisible((v) => !v);
    }
  };

  return (
    <div
      ref={wrapRef}
      className="side-nav-wrapper"
      style={{
        position: "fixed",
        top: "50%",
        right: "20px",
        zIndex: 9999,
        transform: "translate(var(--drag-x, 0px), var(--drag-y, 0px))",
        "--drag-x": "0px",
        "--drag-y": "0px",
      }}
    >
      {!noteHidden && (
        <div className="drag-me-note">
          drag me!
        </div>
      )}

      <button
        className="side-nav-toggle"
        onClick={handleToggle}
        aria-label={navVisible ? "Close menu" : "Open menu"}
      >
        {navVisible ? "×" : "☰"}
      </button>

      <div className={`about-side-nav ${navVisible ? "nav-open" : "nav-closed"}`}>
        <Navigation variant="side" />
      </div>
    </div>
  );
}

export default DraggableSideNav;
