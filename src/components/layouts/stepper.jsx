import React, { useState, useEffect, useRef, useContext } from "react";
import SiteContext from "../../context/siteContext";

function Stepper() {
  const dotsRef = useRef([]);
  const [pages, setPages] = React.useState([]);

  // State to hold the ring's position
  const { currentPage, setCurrentPage, ringPosition, setRingPosition } =
    useContext(SiteContext);

  useEffect(() => {
    // Query the DOM after the component mounts
    const pageElements = document.querySelectorAll(".pagex"); // Use a class or ID that identifies pages
    setPages(Array.from(pageElements)); // Convert NodeList to an array
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const pagesArray = Array.from(pages);

      pagesArray.forEach((page, index) => {
        const pageRect = page.getBoundingClientRect();
        const visibleHeight =
          Math.min(pageRect.bottom, viewportHeight) - Math.max(pageRect.top, 0);

        const visibilityRatio = visibleHeight / pageRect.height;

        if (visibilityRatio >= 0.4) {
          setCurrentPage(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pages]);

  useEffect(() => {
    if (dotsRef.current[currentPage]) {
      const dot = dotsRef.current[currentPage];
      const position = dot.offsetTop + dot.offsetHeight / 2; // Get the center of the dot
      setRingPosition(position);
    }
  }, [currentPage]);

  return (
    <></>
    // <div className="fixed top-0 left-0 h-screen flex flex-col justify-center items-center w-[10vh]">
    //   {/* Ring element that moves */}
    //   <div
    //     className="absolute w-8 h-8 border-2 border-red-600 rounded-full transition-all duration-500"
    //     style={{
    //       top: `${ringPosition}px`,
    //       transform: "translateY(-50%)", // Center the ring vertically
    //     }}
    //   ></div>

    //   {/* Dots for each page */}
    //   <div className="bg-red-600 w-[1px] h-20"></div>
    //   {pages.map((_, index) => (
    //     <React.Fragment key={index}>
    //       <div
    //         ref={(el) => (dotsRef.current[index] = el)} // Store references to each dot
    //         className="w-2 h-2 rounded-full m-3 bg-red-600 cursor-pointer"
    //         onClick={() => {
    //           setCurrentPage(index);
    //           const page = pages[index];
    //           const pageTop = page.offsetTop;
    //           window.scrollTo({ top: pageTop, behavior: "smooth" });
    //           const dot = dotsRef.current[index];
    //           const position = dot.offsetTop + dot.offsetHeight / 2; // Get the center of the dot
    //           setRingPosition(position);
    //         }}
    //       ></div>
    //       {index < pages.length - 1 && (
    //         <div className="bg-red-600 w-[1px] h-20"></div>
    //       )}
    //     </React.Fragment>
    //   ))}
    //   <div className="bg-red-600 w-[1px] h-20"></div>
    // </div>
  );
}

export default Stepper;
