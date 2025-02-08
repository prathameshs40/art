import Router from "./routes/routes";
import ParticlesScene from "./components/particlesScene";
import Header from "./components/layouts/header";

import Lenis from "@studio-freight/lenis";
import { useState, useEffect, React } from "react";
import SiteContext from "./context/siteContext";

function App() {
  const [theme, setTheme] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [ringPosition, setRingPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [aboutPageCounter, setAboutPageCounter] = useState(0);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <SiteContext.Provider
        value={{
          theme,
          setTheme,
          isMenuOpen,
          setIsMenuOpen,
          ringPosition,
          setRingPosition,
          currentPage,
          setCurrentPage,
          aboutPageCounter,
          setAboutPageCounter,
        }}
      >
        <Header />
        <ParticlesScene />
        <Router />

        {/* <Footer /> */}
      </SiteContext.Provider>
    </>
  );
}
export default App;
