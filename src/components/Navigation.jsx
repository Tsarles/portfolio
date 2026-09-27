import { BookOpen, Folder, Home, Mail, UserRound } from "lucide-react";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const items = [
  { path: "/", label: "Home", Icon: Home, color: "green" },
  { path: "/about", label: "About", Icon: UserRound, color: "blue" },
  { path: "/projects", label: "Projects", Icon: Folder, color: "yellow" },
  { path: "/notes", label: "Notes", Icon: BookOpen, color: "red" },
  { path: "/contact", label: "Contact", Icon: Mail, color: "cream" },
];

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

export default function Navigation() {
  return (
    <>
      <nav className="key-nav" aria-label="Primary navigation">
        <span className="key-nav-brand" aria-hidden="true">CHA</span>
        {items.map((item) => <KeycapLink key={item.path} item={item} />)}
      </nav>

      <nav className="mobile-key-nav" aria-label="Mobile navigation">
        <span className="mobile-grab" aria-hidden="true" />
        {items.map((item) => <KeycapLink key={item.path} item={item} mobile />)}
      </nav>
    </>
  );
}
