import { useState, useEffect, React } from "react";
import SiteContext from "../context/siteContext";
import { useContext } from "react";
import { gsap } from "gsap";
import Sphere from "../components/sphere";

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
      <div className="flex flex-col justify-center items-center h-screen  pagez">
        <div className="line relative w-[70%] flex justify-center items-center overflow-hidden ">
          <span className="text-9xl leading-tight text-center hero-title">
            Our
          </span>
        </div>
        <div className="line relative w-[70%] flex justify-center items-center overflow-hidden ">
          <span className="text-9xl leading-tight text-center hero-title">
            Story
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-end p-9 sm:p-20">
        <div
          id="page-3"
          className="min-h-96 pagez  flex flex-col justify-center items-center  w-full sm:w-1/2 mb-32 sm:mb-0"
        >
          <h1 className=" text-base font-light">
            At OrcaPixel, we’re passionate about helping businesses unlock their
            full potential in the digital world. We specialize in web design &
            development, mobile app creation, and digital marketing, delivering
            end-to-end solutions that transform ideas into impactful results.
          </h1>
          <p className=" text-base font-light">
            With a team of creative thinkers, tech enthusiasts, and marketing
            experts, we combine creativity with technical excellence to create
            solutions that are as functional as they are beautiful.
          </p>
        </div>

        <div
          id="page-3"
          className="min-h-96 pagez  flex flex-col justify-center items-center  w-full sm:w-1/2"
        >
          {" "}
          <p className="text-primary-300 ">What Sets Us Apart?</p>
          <p className=" text-base font-light mt-20">
            From designing intuitive websites to developing mobile apps and
            crafting strategic digital marketing campaigns, we offer everything
            you need to establish a strong digital presence.From designing
            intuitive websites to developing mobile apps and crafting strategic
            digital marketing campaigns, we offer everything you need to
            establish a strong digital presence.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
