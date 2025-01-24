import Home from "./pages/homePage";
import Router from "./routes/routes";
import Header from "./components/layouts/header";
import Footer from "./components/layouts/footer";
import Lenis from "@studio-freight/lenis";
import { useState, useEffect, useContext, React } from "react";
import SiteContext from "./context/siteContext";

function App() {
  const [theme, setTheme] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ringPosition, setRingPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
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
        }}
      >
        <Header />
        <Router />
        <Footer />
      </SiteContext.Provider>
    </>
  );
}
export default App;
