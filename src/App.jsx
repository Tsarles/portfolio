import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./pages/about";
import Projects from "./pages/projects";
import Contact from "./pages/contact";
import Resume from "./pages/resume";
import CursorPencil from "./components/CursorPencil";
import DoodleBackground from "./components/DoodleBackground";
import Loader from "./components/Loader";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [location.pathname]);

  return (
    <>
      <DoodleBackground />
      <CursorPencil />
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Routes>
        <Route path="/"         element={<Hero />} />
        <Route path="/about"    element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact"  element={<Contact />} />
        <Route path="/resume"   element={<Resume />} />
      </Routes>
    </>
  );
}

export default App;
