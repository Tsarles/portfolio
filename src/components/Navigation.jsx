import { ArrowLeft, Folder, Mail, Smile } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NAV_CONFIG = [
  { path: "/about", label: "About me", icon: Smile, slotClass: "about" },
  { path: "/projects", label: "Projects", icon: Folder, slotClass: "projects" },
  { path: "/contact", label: "Contact", icon: Mail, slotClass: "contact" },
];

function Navigation({ variant = "hero" }) {
  const location = useLocation();
  const currentPath = location.pathname;

  if (variant === "side") {
    const isOnSubpage = currentPath !== "/";
    const others = NAV_CONFIG.filter((item) => item.path !== currentPath);
    const label = (path) => NAV_CONFIG.find((item) => item.path === path)?.label ?? path;

    return (
      <>
        {isOnSubpage && (
          <Link
            key="back"
            to="/"
            className="icon-nav icon-nav-back back"
            aria-label="Back to home"
          >
            <ArrowLeft />
            <span className="icon-label">Back</span>
          </Link>
        )}
        {others.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`icon-nav ${item.slotClass}`}
              aria-label={label(item.path)}
            >
              <Icon />
              <span className="icon-label">{label(item.path)}</span>
            </Link>
          );
        })}
      </>
    );
  }

  return (
    <>
      {NAV_CONFIG.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`icon-nav ${item.slotClass}`}
            aria-label={item.label}
          >
            <Icon />
            <span className="icon-label">{item.label}</span>
          </Link>
        );
      })}
    </>
  );
}

export default Navigation;
