import { Link, useNavigate } from "react-router-dom";
import SiteContext from "../../context/siteContext";
import Stepper from "../layouts/stepper";
import { useContext } from "react";
function Header() {
  const isMenuOpen_temp = true;
  const { isMenuOpen, theme, setTheme, setIsMenuOpen } =
    useContext(SiteContext);
  const navigate = useNavigate();
  const goToAbout = (url) => {
    navigate(url);
  };
  return (
    <>
      <Stepper />
      <header
        className={`transition-all ease-in-out duration-500 z-50 fixed top-0 w-full  ${
          theme ? "text-black" : "text-white"
        } `}
      >
        <nav>
          <img src="logo512.png" alt="" />

          <div className="h-full flex">
            {/* <button className="bg-orange-100 rounded-2xl  mr-2 font-semibold italic px-5 text-orange-500">
              Book A Slot
            </button> */}
            <button onClick={() => setIsMenuOpen(true)}>Menu</button>
            <button className="ml-4" onClick={() => setTheme(!theme)}>
              Switch
            </button>
          </div>
        </nav>
        <div
          className={`sidenav  ${
            isMenuOpen ? "translate-y-0 " : "-translate-y-full"
          }`}
        >
          <div className="leftSideNav">
            <span onClick={() => goToAbout("/")}>Home</span>
            <span onClick={() => goToAbout("/about")}>about</span>
          </div>
          <div className="rightSideNav">
            <span onClick={() => setIsMenuOpen(false)}>close</span>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
