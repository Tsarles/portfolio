import { BookOpen, Folder, Home, Mail, Moon, Sun, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const items = [
  { path: "/", label: "Home", Icon: Home, color: "green" },
  { path: "/about", label: "About", Icon: UserRound, color: "blue" },
  { path: "/projects", label: "Projects", Icon: Folder, color: "red" },
  { path: "/notes", label: "Notes", Icon: BookOpen, color: "green" },
  { path: "/contact", label: "Contact", Icon: Mail, color: "cream" },
];

function KeyLink({ item, mobile = false }) {
  const [showLabel, setShowLabel] = useState(false);
  const timer = useRef(null);

  const startPress = () => {
    timer.current = window.setTimeout(() => {
      setShowLabel(true);
      window.navigator.vibrate?.(18);
    }, 430);
  };

  const endPress = () => {
    window.clearTimeout(timer.current);
    window.setTimeout(() => setShowLabel(false), 850);
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <NavLink
      to={item.path}
      end={item.path === "/"}
      aria-label={item.label}
      onPointerDown={startPress}
      onPointerUp={endPress}
      onPointerCancel={endPress}
      onPointerLeave={endPress}
      className={({ isActive }) =>
        `${mobile ? "mobile-key" : "keycap"} keycap-${item.color}${isActive ? " active" : ""}${showLabel ? " show-label" : ""}`
      }
    >
      <span className="keycap-top">
        <item.Icon aria-hidden="true" />
      </span>
      <span className="keycap-tooltip" role="tooltip">{item.label}</span>
    </NavLink>
  );
}

function ThemeKey({ theme, onToggle, mobile = false }) {
  const nextLabel = theme === "dark" ? "Use light mode" : "Use dark mode";
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      aria-label={nextLabel}
      title={nextLabel}
      onClick={onToggle}
      className={`${mobile ? "mobile-key" : "keycap"} keycap-theme`}
    >
      <span className="keycap-top">
        <Icon aria-hidden="true" />
      </span>
      <span className="keycap-tooltip" role="tooltip">{nextLabel}</span>
    </button>
  );
}

export default function Navigation() {
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem("cha-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("cha-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => current === "dark" ? "light" : "dark");

  return (
    <>
      <nav className="key-nav" aria-label="Primary navigation">
        <span className="key-nav-brand" aria-hidden="true">CHA</span>
        {items.map((item) => <KeyLink key={item.path} item={item} />)}
        <ThemeKey theme={theme} onToggle={toggleTheme} />
      </nav>

      <nav className="mobile-key-nav" aria-label="Mobile navigation">
        <span className="mobile-grab" aria-hidden="true" />
        {items.map((item) => <KeyLink key={item.path} item={item} mobile />)}
        <ThemeKey theme={theme} onToggle={toggleTheme} mobile />
      </nav>
    </>
  );
}
