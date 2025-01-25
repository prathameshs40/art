import { useState, useEffect } from "react";
import SiteContext from "../context/siteContext";
import { useContext } from "react";
function Home() {
  const [data, setData] = useState({
    welcome: "Welcom To",
    company: "OrcaPixel",
  });
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
            <span className="font-light font-mont">{data.welcome}</span>
            <span className="text-9xl font-black font-mont uppercase">
              {data.company}
            </span>
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
