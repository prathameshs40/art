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
    <>
      <div className="flex flex-col justify-center items-center h-screen text-white ">
        <h1 className="text-red-500">Our Story</h1>
        {/* Dynamically sized line */}
        <div className="line relative w-[70%] flex justify-center items-center overflow-hidden ">
          <span className="text-9xl leading-tight text-center">Turning</span>
        </div>
        <div className="line relative w-[70%] flex justify-center items-center overflow-hidden ">
          <span className="text-9xl leading-tight text-center">ideas</span>
        </div>
        <div className="line relative w-[70%] flex justify-center items-center overflow-hidden ">
          <span className="text-9xl leading-tight text-center">into</span>
        </div>
        <div className="line relative w-[70%] flex justify-center items-center overflow-hidden ">
          <span className="text-9xl leading-tight text-center">reality</span>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center">
        <h1 className="w-1/2 text-white text-center">
          At OrcaPixel, we’re passionate about helping businesses unlock their
          full potential in the digital world. We specialize in web design &
          development, mobile app creation, and digital marketing, delivering
          end-to-end solutions that transform ideas into impactful results.
        </h1>
        <h1 className="w-1/2 text-white text-center">
          With a team of creative thinkers, tech enthusiasts, and marketing
          experts, we combine creativity with technical excellence to create
          solutions that are as functional as they are beautiful.
        </h1>
        <h1 className="text-red-500 mt-20">Our Mission</h1>
        <h1 className="w-1/2 text-white text-center">
          To empower businesses to thrive in the digital age by providing
          innovative, user-centric, and results-driven solutions.
        </h1>
        <h1 className="text-red-500 mt-20">Our Vision</h1>
        <h1 className="w-1/2 text-white text-center">
          To be a trusted partner for businesses worldwide, enabling their
          success with transformative technology and creative strategies.
        </h1>
      </div>
    </>
  );
};

export default About;
