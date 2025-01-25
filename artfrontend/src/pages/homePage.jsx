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
          theme
            ? "text-red-500 "
            : "text-prime-white-1 "
        }`}
      >
        {/* Page 1 */}
        <div
          id="page-1"
          className=" min-h-screen pagex flex flex-col justify-center items-center"
        >
          <div className="flex flex-col">
      <div className="line relative w-[70%] flex overflow-hidden">
        <span className="font-light font-mont leading-none">{data.welcome}</span>
      </div>
      <div className="line relative w-auto flex overflow-hidden">
        <span className="text-9xl font-black font-mont uppercase leading-none">{data.company}</span>
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
          className="min-h-screen pagex flex flex-col justify-center items-center"
        >
          <h1 className="text-white text-4xl">Page 2</h1>
        </div>

        {/* Page 3 */}
        <div
          id="page-3"
          className="min-h-screen pagex  flex flex-col justify-center items-center"
        >
          <h1 className="text-white text-4xl">Page 3</h1>
        </div>

        {/* Page 4 */}
        <div
          id="page-4"
          className="min-h-screen pagex  flex flex-col justify-center items-center"
        >
          <h1 className="text-white text-4xl">Page 4</h1>
        </div>
      </div>
    </>
  );
}

export default Home;
