import { lazy, Suspense, useCallback, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import CursorPencil from "./components/CursorPencil";
import DoodleBackground from "./components/DoodleBackground";
import Loader from "./components/Loader";

const About = lazy(() => import("./pages/about"));
const Projects = lazy(() => import("./pages/projects"));
const Contact = lazy(() => import("./pages/contact"));

function App() {
  const [loading, setLoading] = useState(
    () => sessionStorage.getItem("portfolio-intro-seen") !== "true"
  );

  const finishLoading = useCallback(() => {
    sessionStorage.setItem("portfolio-intro-seen", "true");
    setLoading(false);
  }, []);

  return (
    <>
      <DoodleBackground />
      <CursorPencil />
      {loading && <Loader onDone={finishLoading} />}
      <Suspense fallback={<div className="route-loading" role="status">Opening page...</div>}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Navigate to="/about" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
