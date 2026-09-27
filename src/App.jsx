import { lazy, Suspense, useCallback, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CursorPencil from "./components/CursorPencil";
import Loader from "./components/Loader";

const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./pages/about"));
const Projects = lazy(() => import("./pages/projects"));
const Notes = lazy(() => import("./pages/notes"));
const Contact = lazy(() => import("./pages/contact"));

function App() {
  const [loading, setLoading] = useState(
    () => sessionStorage.getItem("portfolio-v2-intro-seen") !== "true"
  );

  const finishLoading = useCallback(() => {
    sessionStorage.setItem("portfolio-v2-intro-seen", "true");
    setLoading(false);
  }, []);

  return (
    <>
      <CursorPencil />
      {loading && <Loader onDone={finishLoading} />}
      <Suspense fallback={<div className="route-loading" role="status">Opening the folder...</div>}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Navigate to="/about" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
