import { useState, useEffect } from "react";
import SiteContext from "../context/siteContext";
import { useContext } from "react";
import PageTitleSection from "./../components/pageTitleSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TestPyramid from "../components/TestPyramid";
import TestCube from "../components/BloomingHeart";
import ThreeJSComponent from "../components/ThreeJSComponent";
function Home() {
  const { isMenuOpen, theme, setTheme, setIsMenuOpen } =
    useContext(SiteContext);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".scaleNGo").forEach((element) => {
      gsap.fromTo(
        element,
        {
          //  scale: 1,
          opacity: 1,
        },
        {
          // scale: 2,
          opacity: 0,
          scrollTrigger: {
            trigger: element,
            start: "70% center",
            end: "bottom center",
            scrub: true,
            // markers: true,
          },
        }
      );
    });
    document.querySelectorAll(".opacityNGo").forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: element,
            start: "50% center",
            end: "bottom center",
            scrub: true,
            // markers: true,
          },
        }
      );
    });
    // gsap.fromTo(
    //   ".scaleNGo",
    //   { scale: 1, opacity: 1 },
    //   {
    //     scale: 2,
    //     opacity: 0,
    //     scrollTrigger: {
    //       trigger: ".scaleNGo",
    //       start: "70% center", // Animation starts when Page 2 hits the center of the viewport
    //       end: "bottom center", // Animation ends when Page 2 reaches the top of the viewport
    //       scrub: true, // Smoothly connects the animation to the scroll
    //       markers: true, // Debug markers for start and end points
    //     },
    //   }
    // );

    // GSAP Animation
    const tl = gsap.timeline();
    tl.from(".line span", 1, {
      y: 150,
      ease: "power4.out",
      stagger: {
        amount: 0.3,
      },
    });
  }, []);
  return (
    <>
      {/* <PageTitleSection /> */}
      <div
        className={`transition-all duration-700 ${
          theme ? "text-red-500 " : "text-prime-white-1 "
        }`}
      >
        {/* Page 1 */}
        <div
          id="page-1"
          className="scaleNGo min-h-screen pagex flex flex-col justify-center items-center"
        >
          <div className="flex flex-col ">
            <div className="line relative w-auto flex overflow-hidden">
              <span
                className="text-9xl font-light font-mont uppercase leading-none tracking-prime
"
              >
                OrcaPixel
              </span>
            </div>
            <div className="line relative w-[100%] flex overflow-hidden justify-center">
              <span
                className="font-light font-mont leading-none "
                style={{ letterSpacing: "50px" }}
              >
                DESIGN STUDIO
              </span>
            </div>
            {/* <span className="font-light font-mont">{data.welcome}</span>
            <span className="text-9xl font-black font-mont uppercase">
              {data.company}
            </span> */}
          </div>
        </div>

        {/* Page 2 */}
        <div
          id="page-2"
          className="opacityNGo min-h-screen pagex flex flex-col justify-center items-center"
        >
          <h1 className="text-7xl text-center font-light  mb-4">
            Transforming Ideas into Digital Realities
          </h1>
          <div className="flex justify-center items-center ">
            <div className="flex justify-center items-center w-[70%]">
              <TestPyramid />
              <h1 className="text-white font-light w-1/2 text-center">
                At OrcaPixel, we specialize in creating stunning websites,
                dynamic mobile apps, and innovative digital marketing solutions.
                Whether it’s a sleek design, a powerful development solution, or
                a strategy to grow your online presence, we’re here to make it
                happen
              </h1>
            </div>
          </div>
        </div>

        {/* Page 3 */}
        <div
          id="page-3"
          className="opacityNGo min-h-screen pagex  flex flex-col justify-center items-center"
        >
          <h1 className="text-7xl text-center font-light  mb-4">
            Your Digital Growth Partner
          </h1>

          <div className="flex justify-center items-center ">
            <div className="flex justify-center items-center w-[70%]">
              <ThreeJSComponent />
              <h1 className="text-white font-light w-1/2 text-center">
                OrcaPixel is more than just a tech company—we’re your creative
                and strategic partner. From building responsive websites and
                mobile apps to driving impactful digital marketing campaigns,
                we’re committed to delivering solutions that go beyond
                expectations. Our mission is simple: To help businesses grow,
                engage, and succeed in a digital-first world.OrcaPixel is more
                than just a tech company—we’re your creative and strategic
                partner. From building responsive websites and mobile apps to
                driving impactful digital marketing campaigns, we’re committed
                to delivering solutions that go beyond expectations. Our mission
                is simple: To help businesses grow, engage, and succeed in a
                digital-first world.
              </h1>
            </div>
          </div>
        </div>

        {/* Page 4 */}
        <div
          id="page-4"
          className="opacityNGo min-h-screen pagex flex justify-center items-center text-center px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            <div className="flex flex-col  items-center p-4  rounded-xl">
              <h1 className=" text-2xl font-light text-center">
                Web Design & Development
              </h1>
              <h1 className=" text-base font-light mt-1 text-center">
                From visually stunning designs to seamless functionality, our
                websites are built to captivate and convert.
              </h1>
            </div>
            <div className="flex flex-col  items-center p-4  rounded-xl">
              <h1 className=" text-2xl font-light text-center">
                Mobile App Development
              </h1>
              <h1 className=" text-base font-light mt-1 text-center">
                Deliver exceptional user experiences with feature-rich and
                scalable mobile apps for Android and iOS.
              </h1>
            </div>
          </div>
        </div>
        {/* <div classname="flex flex-col justify-center items-center">
            <h1 className=" text-2xl font-light w-1/2">
              Expand your reach and boost your brand with tailored digital
              strategies, including:
            </h1>
            <ul className="mt-4">
              <li>Social Media Marketing (SMM)</li>
              <li>Search Engine Optimization (SEO)</li>
              <li>Pay-Per-Click Advertising (PPC)</li>
              <li>Content Marketing</li>
            </ul>
          </div> */}
      </div>
    </>
  );
}

export default Home;
