import { useState, useEffect } from "react";
import { useContext } from "react";
import SiteContext from "../context/siteContext";
import PageTitleSection from "./../components/pageTitleSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function TestTrigger() {
  const [data] = useState({
    welcome: "Welcome To",
    company: "OrcaPixel",
  });

  const { theme } = useContext(SiteContext);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Animate the text on Page 1 scaling up when scrolling to Page 2
    gsap.fromTo(
      "#page-1",
      { scale: 1, opacity: 1 },
      {
        scale: 2,
        opacity: 0,
        scrollTrigger: {
          trigger: "#page-1",
          start: "70% center", // Animation starts when Page 2 hits the center of the viewport
          end: "bottom center", // Animation ends when Page 2 reaches the top of the viewport
          scrub: true, // Smoothly connects the animation to the scroll
          markers: true, // Debug markers for start and end points
        },
      }
    );
  }, []);

  return (
    <>
      <PageTitleSection />
      <div
        className={`transition-all duration-700 ${
          theme ? "text-red-500 " : "text-prime-white-1 "
        }`}
      >
        {/* Page 1 */}
        <div
          id="page-1"
          className="min-h-screen pagex flex flex-col justify-center items-center"
        >
          <div className="flex flex-col">
            <div className="line relative w-[70%] flex overflow-hidden">
              <span className="font-light font-mont leading-none">
                {data.welcome}
              </span>
            </div>
            <div className="line relative w-auto flex overflow-hidden">
              <span className="text-9xl font-light font-mont uppercase leading-none tracking-prime">
                {data.company}
              </span>
            </div>
          </div>
        </div>

        {/* Page 2 */}
        <div
          id="page-2"
          className="min-h-screen pagex flex flex-col justify-center items-end pr-52"
        >
          <h1 className="text-white text-base font-light w-1/2">
            At OrcaPixel, we specialize in creating stunning websites, dynamic
            mobile apps, and innovative digital marketing solutions...
          </h1>
        </div>
      </div>
    </>
  );
}

export default TestTrigger;
