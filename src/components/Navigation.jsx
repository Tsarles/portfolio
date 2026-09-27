import { BookOpen, Folder, Home, Lock, Mail, RotateCcw, Settings2, Unlock, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const items = [
  { path: "/", label: "Home", Icon: Home, color: "blue" },
  { path: "/about", label: "About", Icon: UserRound, color: "red" },
  { path: "/projects", label: "Projects", Icon: Folder, color: "navy" },
  { path: "/notes", label: "Notes", Icon: BookOpen, color: "blue" },
  { path: "/contact", label: "Contact", Icon: Mail, color: "cream" },
];

const defaultPositions = {
  desktop: { x: 0, y: 0 },
  mobile: { x: 0, y: 0 },
};

function readPositions() {
  try {
    const saved = JSON.parse(localStorage.getItem("cha-nav-position"));
    return {
      desktop: { ...defaultPositions.desktop, ...saved?.desktop },
      mobile: { ...defaultPositions.mobile, ...saved?.mobile },
    };
  } catch {
    return defaultPositions;
  }
}

function KeycapLink({ item, mobile = false }) {
  const [heldLabel, setHeldLabel] = useState(false);
  const timer = useRef(null);
  const didHold = useRef(false);

  const startHold = () => {
    didHold.current = false;
    timer.current = window.setTimeout(() => {
      didHold.current = true;
      setHeldLabel(true);
      window.navigator.vibrate?.(18);
    }, 430);
  };

  const endHold = () => {
    window.clearTimeout(timer.current);
    window.setTimeout(() => setHeldLabel(false), 550);
  };

  return (
    <NavLink
      to={item.path}
      end={item.path === "/"}
      aria-label={item.label}
      data-label={item.label}
      onPointerDown={startHold}
      onPointerUp={endHold}
      onPointerCancel={endHold}
      onPointerLeave={endHold}
      onContextMenu={(event) => event.preventDefault()}
      onClick={(event) => {
        if (didHold.current) {
          event.preventDefault();
          didHold.current = false;
        }
      }}
      className={({ isActive }) => `${mobile ? "mobile-key" : "keycap"} keycap-${item.color}${isActive ? " active" : ""}${heldLabel ? " show-label" : ""}`}
    >
      <span className="keycap-top"><item.Icon aria-hidden="true" /></span>
      <span className="keycap-tooltip" role="tooltip">{item.label}</span>
    </NavLink>
  );
}

function SettingsKey({ mobile = false, onClick }) {
  return (
    <button
      type="button"
      className={`${mobile ? "mobile-key" : "keycap"} keycap-settings`}
      aria-label="Navigation settings"
      onClick={onClick}
    >
      <span className="keycap-top"><Settings2 aria-hidden="true" /></span>
      <span className="keycap-tooltip" role="tooltip">Settings</span>
    </button>
  );
}

export default function Navigation() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draggable, setDraggable] = useState(() => localStorage.getItem("cha-nav-draggable") === "true");
  const [positions, setPositions] = useState(readPositions);
  const drag = useRef(null);

  useEffect(() => {
    localStorage.setItem("cha-nav-draggable", String(draggable));
  }, [draggable]);

  useEffect(() => {
    localStorage.setItem("cha-nav-position", JSON.stringify(positions));
  }, [positions]);

  const startDrag = (event, mode) => {
    if (!draggable) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    drag.current = {
      mode,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: positions[mode],
    };
  };

  const moveDrag = (event) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    const { mode, startX, startY, origin } = drag.current;
    const rawX = origin.x + event.clientX - startX;
    const rawY = origin.y + event.clientY - startY;
    const next = mode === "desktop"
      ? {
          x: Math.min(Math.max(rawX, -12), window.innerWidth - 126),
          y: Math.min(Math.max(rawY, -window.innerHeight / 2 + 92), window.innerHeight / 2 - 92),
        }
      : {
          x: Math.min(Math.max(rawX, -window.innerWidth / 2 + 60), window.innerWidth / 2 - 60),
          y: Math.min(Math.max(rawY, -window.innerHeight + 120), 20),
        };
    setPositions((current) => ({ ...current, [mode]: next }));
  };

  const endDrag = (event) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    drag.current = null;
  };

  const resetPositions = () => setPositions(defaultPositions);

  const desktopStyle = {
    "--nav-x": `${positions.desktop.x}px`,
    "--nav-y": `${positions.desktop.y}px`,
  };
  const mobileStyle = {
    "--nav-x": `${positions.mobile.x}px`,
    "--nav-y": `${positions.mobile.y}px`,
  };

  return (
    <>
      <nav className={`key-nav${draggable ? " is-draggable" : ""}`} style={desktopStyle} aria-label="Primary navigation">
        <button
          type="button"
          className="key-nav-brand nav-drag-handle"
          aria-label={draggable ? "Drag navigation" : "Navigation is locked"}
          onPointerDown={(event) => startDrag(event, "desktop")}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          CHA {draggable ? <Unlock aria-hidden="true" /> : <Lock aria-hidden="true" />}
        </button>
        {items.map((item) => <KeycapLink key={item.path} item={item} />)}
        <SettingsKey onClick={() => setSettingsOpen(true)} />
      </nav>

      <nav className={`mobile-key-nav${draggable ? " is-draggable" : ""}`} style={mobileStyle} aria-label="Mobile navigation">
        <button
          type="button"
          className="mobile-grab nav-drag-handle"
          aria-label={draggable ? "Drag navigation" : "Navigation is locked"}
          onPointerDown={(event) => startDrag(event, "mobile")}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <span aria-hidden="true" />
        </button>
        {items.map((item) => <KeycapLink key={item.path} item={item} mobile />)}
        <SettingsKey mobile onClick={() => setSettingsOpen(true)} />
      </nav>

      {settingsOpen && (
        <section className="nav-settings" role="dialog" aria-modal="false" aria-labelledby="nav-settings-title">
          <button type="button" className="nav-settings-close" aria-label="Close navigation settings" onClick={() => setSettingsOpen(false)}>
            <X aria-hidden="true" />
          </button>
          <Settings2 aria-hidden="true" className="nav-settings-icon" />
          <div>
            <h2 id="nav-settings-title">Navigation settings</h2>
            <p>Choose whether the keycap navigation stays fixed or can be moved.</p>
          </div>
          <label className="nav-drag-toggle">
            <input type="checkbox" checked={draggable} onChange={(event) => setDraggable(event.target.checked)} />
            <span aria-hidden="true" />
            <strong>{draggable ? "Draggable" : "Locked in place"}</strong>
          </label>
          <button type="button" className="nav-reset" onClick={resetPositions}>
            <RotateCcw aria-hidden="true" /> Reset position
          </button>
          {draggable && <p className="nav-settings-tip">Drag the CHA label on desktop or the small handle on mobile.</p>}
        </section>
      )}
    </>
  );
}
