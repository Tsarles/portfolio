import { BookOpen, Folder, Home, Mail, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { path: "/", label: "Home", Icon: Home, color: "green" },
  { path: "/about", label: "About", Icon: UserRound, color: "blue" },
  { path: "/projects", label: "Projects", Icon: Folder, color: "yellow" },
  { path: "/notes", label: "Notes", Icon: BookOpen, color: "red" },
  { path: "/contact", label: "Contact", Icon: Mail, color: "cream" },
];

export default function Navigation() {
  return (
    <>
      <nav className="key-nav" aria-label="Primary navigation">
        <span className="key-nav-brand" aria-hidden="true">CHA</span>
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) => `keycap keycap-${item.color}${isActive ? " active" : ""}`}
          >
            <item.Icon aria-hidden="true" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <nav className="mobile-key-nav" aria-label="Mobile navigation">
        <span className="mobile-grab" aria-hidden="true" />
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            aria-label={item.label}
            className={({ isActive }) => `mobile-key keycap-${item.color}${isActive ? " active" : ""}`}
          >
            <item.Icon aria-hidden="true" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
