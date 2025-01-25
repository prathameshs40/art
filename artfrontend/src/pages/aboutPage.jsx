import React, { useEffect } from "react";
import { gsap } from "gsap";

const About = () => {
  useEffect(() => {
    // GSAP Animation
    const tl = gsap.timeline();
    tl.from(".line span", 1, {
      y: 200,
      ease: "power4.out",
      stagger: {
        amount: 0.3,
      },
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen text-white ">
      {/* Dynamically sized line */}
      <div className="line relative w-[70%] flex justify-center items-center overflow-hidden">
        <span className="text-9xl leading-none">Hello!</span>
      </div>
    </div>
  );
};

export default About;
