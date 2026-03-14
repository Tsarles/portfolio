import { useState, useEffect, useRef } from "react";

/**
 * @param {string} fullText
 * @param {number} speedMs - delay between characters
 * @param {boolean} run - when true, types from start (resets when run goes true)
 * @returns {string} currently displayed substring
 */
export function useTypewriter(fullText, speedMs, run) {
  const [display, setDisplay] = useState("");
  const indexRef = useRef(0);
  const runRef = useRef(false);

  useEffect(() => {
    if (!run) {
      runRef.current = false;
      return;
    }
    runRef.current = true;
    indexRef.current = 0;
    setDisplay("");

    const id = setInterval(() => {
      if (indexRef.current >= fullText.length) {
        clearInterval(id);
        return;
      }
      indexRef.current += 1;
      setDisplay(fullText.slice(0, indexRef.current));
    }, speedMs);

    return () => clearInterval(id);
  }, [fullText, speedMs, run]);

  return display;
}
