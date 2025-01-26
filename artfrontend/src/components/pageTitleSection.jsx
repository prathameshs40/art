import React, { useEffect, useContext } from "react";
import { gsap } from "gsap";
import SiteContext from "../context/siteContext";

const PageTitleSection = () => {
  const { currentPage } = useContext(SiteContext);

  useEffect(() => {
    // Animate titles when `currentPage` changes
    const tl = gsap.timeline();

    // Move the current page title into view
    tl.to(`.line .span${currentPage}`, {
      y: 0,
      ease: "power4.out",
      duration: 0.5,
    });

    // Move the previous page title out of view upwards
    if (currentPage > 1) {
      tl.to(
        `.line .span${currentPage - 1}`,
        {
          y: -100,
          ease: "power4.out",
          duration: 0.5,
        },
        "<" // Start this animation at the same time as the current page animation
      );
    }

    // Move the next page title out of view downwards
    if (currentPage < 4) {
      tl.to(
        `.line .span${currentPage + 1}`,
        {
          y: 100,
          ease: "power4.out",
          duration: 0.5,
        },
        "<"
      );
    }

    // Cleanup GSAP timeline
    return () => tl.kill();
  }, [currentPage]);

  return (
    <div className="flex flex-col justify-center items-center h-screen text-white fixed top-0 left-0 w-2/5 -z-10 pl-16 pr-8">
      <div className="line w-full flex flex-col justify-center items-center h-[90px]  overflow-hidden relative">
        {/* Dynamically assign classes for animations */}
        <span className="text-5xl leading-none span span1 absolute translate-y-[100px]">
          Transforming Ideas into Digital Realities
        </span>
        <span className="text-5xl leading-none span span2 absolute translate-y-[100px]">
          Your Digital Growth Partner
        </span>
        <span className="text-5xl leading-none span span3 absolute translate-y-[100px]">
          What We Do
        </span>
        <span className="text-5xl leading-none span span4 absolute translate-y-[100px]">
          Digital Marketing
        </span>
      </div>
    </div>
  );
};

export default PageTitleSection;
