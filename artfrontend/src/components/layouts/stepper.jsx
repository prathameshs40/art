import React, { useState, useEffect, useRef, useContext } from "react";

import SiteContext from "../../context/siteContext";
function Stepper() {
  //   const [currentPage, setCurrentPage] = useState(0);

  // References for all the dots
  const dotsRef = useRef([]);
  const [pages, setPages] = React.useState([]);

  // State to hold the ring's position
  const { currentPage, setCurrentPage, ringPosition, setRingPosition } =
    useContext(SiteContext);

  useEffect(() => {
    console.log(currentPage);

    // Query the DOM after the component mounts
    const pageElements = document.querySelectorAll(".pagex"); // Use a class or ID that identifies pages
    setPages(Array.from(pageElements)); // Convert NodeList to an array
    const pageHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const pagesArray = Array.from(pageElements);

    const visiblePages = pagesArray.filter((pagesArray) => {
      const pageRect = pagesArray.getBoundingClientRect();
      return pageRect.top <= pageHeight && pageRect.bottom >= 0;
    });

    if (visiblePages.length > 0) {
      const currentPage = visiblePages[0];
      console.log(pagesArray.indexOf(currentPage));
      setCurrentPage(pagesArray.indexOf(currentPage));
    }
  }, []);
  // Update ring position based on the current page
  useEffect(() => {
    if (dotsRef.current[currentPage]) {
      const dot = dotsRef.current[currentPage];
      const position = dot.offsetTop + dot.offsetHeight / 2; // Get the center of the circle
      setRingPosition(position);
    }
    console.log(currentPage);
  }, [currentPage]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pageHeight = window.innerHeight;
      const pagesArray = Array.from(pages);

      const visiblePages = pagesArray.filter((page) => {
        const pageRect = page.getBoundingClientRect();
        return pageRect.top <= pageHeight && pageRect.bottom >= 0;
      });

      if (visiblePages.length > 0) {
        const currentPage = visiblePages[0];
        setCurrentPage(pagesArray.indexOf(currentPage));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, pages]);
  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const scrollY = window.scrollY;
  //       const pageHeight = window.innerHeight;
  //       const pagesArray = Array.from(pages);

  //       pagesArray.forEach((page, index) => {
  //         const pageTop = page.offsetTop;
  //         const pageHeight = page.offsetHeight;

  //         if (scrollY >= pageTop && scrollY <= pageTop + pageHeight) {
  //           setCurrentPage(index);
  //         }
  //       });
  //     };

  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, [currentPage, pages]);
  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const scrollY = window.scrollY;
  //       const pageHeight = window.innerHeight;
  //       const pagesArray = Array.from(pages);

  //       pagesArray.forEach((page, index) => {
  //         const pageTop = page.offsetTop;
  //         const pageHeight = page.offsetHeight;

  //         if (scrollY >= pageTop && scrollY <= pageTop + pageHeight) {
  //           setCurrentPage(index);
  //         }
  //       });
  //     };

  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, [currentPage, pages]);

  return (
    <div className="fixed top-0 left-0 h-screen flex flex-col justify-center items-center w-[10vh]">
      {/* Ring element that moves */}
      <div
        className="absolute w-8 h-8 border-2 border-red-600 rounded-full transition-all duration-500"
        style={{
          top: `${ringPosition}px`,
          transform: "translateY(-50%)", // Center the ring vertically
        }}
      ></div>

      {/* Dots for each page */}
      <div className="bg-red-600 w-[1px] h-20"></div>
      {pages.map((_, index) => (
        <React.Fragment key={index}>
          <div
            ref={(el) => (dotsRef.current[index] = el)} // Store references to each dot
            className="w-2 h-2 rounded-full m-3 bg-red-600 cursor-pointer"
            onClick={() => {
              setCurrentPage(index);
              const page = pages[index];
              const pageTop = page.offsetTop;
              window.scrollTo({ top: pageTop, behavior: "smooth" });
              const dot = dotsRef.current[index];
              const position = dot.offsetTop + dot.offsetHeight / 2; // Get the center of the dot
              setRingPosition(position);
            }}
          ></div>
          {index < pages.length - 1 && (
            <div className="bg-red-600 w-[1px] h-20"></div>
          )}
        </React.Fragment>
      ))}
      <div className="bg-red-600 w-[1px] h-20"></div>
    </div>
  );
  //   return (
  //     <div className="fixed top-0 left-0 h-screen flex flex-col justify-center items-center w-[10vh]">
  //       {/* Ring element that moves */}
  //       <div
  //         className="absolute w-8 h-8 border-2 border-red-500 rounded-full transition-all duration-500"
  //         style={{
  //           top: `${ringPosition}px`,
  //           transform: "translateY(-50%)", // Center the ring vertically
  //         }}
  //       ></div>

  //       {/* Dots for each page */}
  //       {pages.map((_, index) => (
  //         <React.Fragment key={index}>
  //           <div
  //             ref={(el) => (dotsRef.current[index] = el)} // Store references to each dot
  //             className="w-2 h-2 rounded-full m-3 bg-red-600"
  //           ></div>
  //           {index < pages.length - 1 && (
  //             <div className="bg-red-400 w-[1px] h-20 rounded-full"></div>
  //           )}
  //         </React.Fragment>
  //       ))}
  //     </div>
  //   );
  //   return (
  //     <>
  //       <div className="fixed top-0 left-0 h-screen flex flex-col justify-center items-center w-[10vh]">
  //         <div className="w-5 h-5 rounded-full m-3 border-2 flex justify-center items-center"></div>
  //         <div className="w-2 h-2 rounded-full bg-red-500 m-4"></div>
  //         <div className="bg-red-400 w-[1px] h-28 rounded-full"></div>
  //       </div>
  //     </>
  //   );
}

export default Stepper;
