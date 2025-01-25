import { useState, useEffect } from "react";
import SiteContext from "../context/siteContext";
import { useContext } from "react";
import { gsap } from "gsap";
function Home() {
  const [data, setData] = useState({
    welcome: "Welcom To",
    company: "OrcaPixel",
  });
  useEffect(() => {
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
  const { isMenuOpen, theme, setTheme, setIsMenuOpen } =
    useContext(SiteContext);
  // useEffect(() => {
  //   fetch("http://localhost:8000/users")
  //     .then((response) => response.json())
  //     .then((data) => setData(data.data))
  //     .catch((error) => console.error(error));
  // }, []);

  return (
    <>
      <div
        className={`transition-all duration-700 ${
          theme ? "text-red-500 " : "text-prime-white-1 "
        }`}
      >
        {/* Page 1 */}
        <div
          id="page-1"
          className=" min-h-screen pagex flex flex-col justify-center items-center"
        >
          <div className="flex flex-col ">
            <div className="line relative w-[70%] flex overflow-hidden">
              <span className="font-light font-mont leading-none">
                {data.welcome}
              </span>
            </div>
            <div className="line relative w-auto flex overflow-hidden">
              <span
                className="text-9xl font-light font-mont uppercase leading-none tracking-prime
"
              >
                {data.company}
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
          className="min-h-screen pagex flex flex-col justify-center items-end pr-52"
        >
          <h1 className="text-white text-base font-light w-1/2 ">
            At OrcaPixel, we specialize in creating stunning websites, dynamic
            mobile apps, and innovative digital marketing solutions. Whether
            it’s a sleek design, a powerful development solution, or a strategy
            to grow your online presence, we’re here to make it happen
          </h1>
        </div>

        {/* Page 3 */}
        <div
          id="page-3"
          className="min-h-screen pagex  flex flex-col justify-center items-end pr-52"
        >
          <h1 className="text-white text-base font-light w-1/2 ">
            OrcaPixel is more than just a tech company—we’re your creative and
            strategic partner. From building responsive websites and mobile apps
            to driving impactful digital marketing campaigns, we’re committed to
            delivering solutions that go beyond expectations. Our mission is
            simple: To help businesses grow, engage, and succeed in a
            digital-first world.OrcaPixel is more than just a tech company—we’re
            your creative and strategic partner. From building responsive
            websites and mobile apps to driving impactful digital marketing
            campaigns, we’re committed to delivering solutions that go beyond
            expectations. Our mission is simple: To help businesses grow,
            engage, and succeed in a digital-first world.
          </h1>
        </div>

        {/* Page 4 */}
        <div
          id="page-4"
          className="min-h-screen pagex  flex flex-col justify-center items-end pr-52"
        >
          <h1 className="text-white text-2xl font-light w-1/2 ">
            Web Design & Development
          </h1>
          <h1 className="text-white text-base font-light w-1/2 mt-1">
            From visually stunning designs to seamless functionality, our
            websites are built to captivate and convert.
          </h1>
          <h1 className="text-white text-2xl font-light w-1/2 mt-10">
            Mobile App Development
          </h1>
          <h1 className="text-white text-base font-light w-1/2 mt-1">
            Deliver exceptional user experiences with feature-rich and scalable
            mobile apps for Android and iOS.
          </h1>
        </div>
      </div>
    </>
  );
}

export default Home;
