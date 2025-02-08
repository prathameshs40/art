import { useEffect } from "react";
import SiteContext from "../context/siteContext";
import { useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TestPyramid from "../components/TestPyramid";
import ThreeJSComponent from "../components/ThreeJSComponent";
import ClientVideo from "../components/ClientVideo";
function Home() {
  const { isMenuOpen, theme, setTheme, setIsMenuOpen } =
    useContext(SiteContext);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".scaleNGo").forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: element,
            start: "70% center",
            end: "bottom center",
            scrub: true,
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
            start: "top 20%",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    const tl = gsap.timeline();
    tl.from(".line span", 1.5, {
      y: 150,
      ease: "power4.out",
      stagger: {
        amount: 0.3,
      },
    });
  }, []);
  return (
    <>
      <div
        className={`transition-all duration-700 ${
          theme ? "text-primary-300 " : "text-prime-white-1 "
        }`}
      >
        <div
          id="page-1"
          className="scaleNGo min-h-screen pagex flex flex-col justify-center items-center"
        >
          <div className="flex flex-col ">
            <div className="line relative w-auto flex justify-center items-center overflow-hidden">
              <h1
                className="text-9xl font-light font-mont uppercase leading-none tracking-prime hero-title
"
              >
                OrcaPixel
              </h1>
            </div>
            <div className="line relative w-[100%] flex justify-center items-center overflow-hidden mt-1">
              <span
                className="font-light font-mont leading-none sub-title text-center"
                style={{ letterSpacing: "1.5em" }}
              >
                DESIGN STUDIO
              </span>
            </div>
          </div>
        </div>

        <div
          id="page-2"
          className=" min-h-screen pagex flex flex-col justify-center items-center mb-32 md:mb-0"
        >
          <h2 className="opacityNGo text-7xl mid-title  text-center font-light  mb-4">
            Transforming Ideas into Digital Realities
          </h2>
          <div className="flex justify-center items-center ">
            <div className="flex flex-col sm:flex-row justify-center items-center w-[70%]">
              <TestPyramid />
              <p className="opacityNGo  font-light w-full sm:w-1/2 text-center">
                At <span className="text-primary-300">OrcaPixel</span>, we
                specialize in creating stunning websites, dynamic mobile apps,
                and innovative digital marketing solutions. Whether it’s a sleek
                design, a powerful development solution, or a strategy to grow
                your online presence, we’re here to make it happen.
              </p>
            </div>
          </div>
        </div>

        <div
          id="page-3"
          className="min-h-screen pagex  flex flex-col justify-center items-center"
        >
          <h3 className="text-7xl mid-title  text-center font-light  mb-4 opacityNGo ">
            Your Digital Growth Partner
          </h3>

          <div className="flex justify-center items-center ">
            <div className="flex flex-col sm:flex-row justify-center items-center w-[70%]">
              <ThreeJSComponent />
              <p className=" font-light w-full sm:w-1/2 text-center opacityNGo ">
                OrcaPixel is your creative and strategic partner, crafting
                responsive websites, mobile apps, and impactful digital
                marketing. Our mission: to help businesses grow, engage, and
                succeed in a digital-first world.
              </p>
            </div>
          </div>
        </div>

        <div
          id="page-4"
          className=" min-h-screen pagex flex flex-col justify-center items-center text-center px-4"
        >
          <ClientVideo src="trikuta.mp4" />
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-full max-w-4xl mt-10 ">
            <div className="flex flex-col  items-center">
              <h4 className=" text-2xl font-light text-center opacityNGo ">
                Web & Mobile App Development
              </h4>
              <p className=" text-base font-light mt-1 text-center opacityNGo ">
                We provide stunning web designs and feature-rich mobile apps
                that deliver seamless user experiences, drive engagement, and
                maximize conversions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
