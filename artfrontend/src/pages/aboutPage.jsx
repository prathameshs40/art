import { useState, useEffect, React } from "react";
import SiteContext from "../context/siteContext";
import { useContext } from "react";
import { gsap } from "gsap";
import Sphere from "./../components/sphere";

const About = () => {
  const [pages, setPages] = useState([]);

  // State to hold the ring's position
  const {
    aboutPageCounter,
    setAboutPageCounter,
    ringPosition,
    setRingPosition,
  } = useContext(SiteContext);

  useEffect(() => {
    // Query the DOM after the component mounts
    const pageElements = document.querySelectorAll(".pagez"); // Use a class or ID that identifies pages
    console.log(pageElements);

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
          setAboutPageCounter(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pages]);

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
      <Sphere />
      <div className="flex flex-col justify-center items-center h-screen text-white pagez">
        {/* <h1 className="text-red-500">Our Story</h1> */}
        {/* Dynamically sized line */}
        <div className="line relative w-[70%] flex justify-center items-center overflow-hidden ">
          <span className="text-9xl leading-tight text-center">Our</span>
        </div>
        <div className="line relative w-[70%] flex justify-center items-center overflow-hidden ">
          <span className="text-9xl leading-tight text-center">Story</span>
        </div>
      </div>

      <div
        id="page-3"
        className="min-h-screen pagez  flex flex-col justify-center items-end pr-52"
      >
        <h1 className="text-white text-base font-light w-1/2 ">
          At OrcaPixel, we’re passionate about helping businesses unlock their
          full potential in the digital world. We specialize in web design &
          development, mobile app creation, and digital marketing, delivering
          end-to-end solutions that transform ideas into impactful results.
        </h1>
      </div>
      <div
        id="page-3"
        className="min-h-screen pagez  flex flex-col justify-center items-end pr-52"
      >
        <h1 className="text-white text-base font-light w-1/2 ">
          With a team of creative thinkers, tech enthusiasts, and marketing
          experts, we combine creativity with technical excellence to create
          solutions that are as functional as they are beautiful.
        </h1>
      </div>
      <div
        id="page-3"
        className="min-h-screen pagez  flex flex-col justify-center items-end pr-52"
      >
        {" "}
        <h1 className="text-red-500 mt-20">Our Mission</h1>
        <h1 className="text-white text-base font-light w-1/2 ">
          To empower businesses to thrive in the digital age by providing
          innovative, user-centric, and results-driven solutions.
        </h1>
      </div>
      <div
        id="page-3"
        className="min-h-screen pagez  flex flex-col justify-center items-end pr-52"
      >
        {" "}
        <h1 className="text-red-500 mt-20">Our Vision</h1>
        <h1 className="text-white text-base font-light w-1/2">
          To be a trusted partner for businesses worldwide, enabling their
          success with transformative technology and creative strategies.
        </h1>
      </div>
    </>
  );
};

export default About;
