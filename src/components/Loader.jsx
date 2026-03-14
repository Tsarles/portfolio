import { useEffect, useState } from "react";

export default function Loader({ onDone }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    
    const fadeTimer = setTimeout(() => setFadeOut(true), 2600);
    
    const doneTimer = setTimeout(() => { if (onDone) onDone(); }, 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`loader-overlay${fadeOut ? " fade-out" : ""}`}>

      <div className="loader-name-wrap">
    
        <div className="loader-name-fill" aria-hidden="true">
         Cha
        </div>
        <div className="loader-name-outline" aria-label="Charles">
          Cha
        </div>
      </div>

      <div className="loader-dots" aria-hidden="true">
        <span className="loader-dot" />
        <span className="loader-dot" />
        <span className="loader-dot" />
      </div>

    </div>
  );
}