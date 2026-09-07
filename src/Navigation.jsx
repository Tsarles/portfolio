import { Smile, Folder, Mail, GraduationCap, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_CONFIG = [
  { path: "/about", label: "About me", icon: Smile, slotClass: "about" },
  { path: "/projects", label: "Projects", icon: Folder, slotClass: "projects" },
  { path: "/contact", label: "Contact", icon: Mail, slotClass: "contact" },
  { path: "/resume", label: "Resume / CV", icon: GraduationCap, slotClass: "resume" },
];

function Navigation({ variant = "hero" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  if (variant === "side") {
    const isOnSubpage = currentPath !== "/";
    const others = NAV_CONFIG.filter((item) => item.path !== currentPath);
    const label = (path) => (path === "/resume" ? "Resume" : NAV_CONFIG.find((c) => c.path === path)?.label ?? path);

    return (
      <>
        {isOnSubpage && (
          <div
            key="back"
            className="icon-nav icon-nav-back back"
            onClick={() => navigate("/")}
          >
            <ArrowLeft />
            <span className="icon-label">Back</span>
          </div>
        )}
        {others.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.path}
              className={`icon-nav ${item.slotClass}`}
              onClick={() => navigate(item.path)}
            >
              <Icon />
              <span className="icon-label">{label(item.path)}</span>
            </div>
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
          <div
            key={item.path}
            className={`icon-nav ${item.slotClass}`}
            onClick={() => navigate(item.path)}
          >
            <Icon />
            <span className="icon-label">{item.path === "/resume" ? "Resume / CV" : item.label}</span>
          </div>
        );
      })}
    </>
  );
}

export default Navigation;
