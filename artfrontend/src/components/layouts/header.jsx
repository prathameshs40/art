import { Link, useNavigate } from "react-router-dom";
import SiteContext from "../../context/siteContext";
import Stepper from "../layouts/stepper";
import { useContext } from "react";
function Header() {
  const isMenuOpen_temp = true;
  const { isMenuOpen, theme, setTheme, setIsMenuOpen } =
    useContext(SiteContext);
  const navigate = useNavigate();
  const navigateToPage = (url) => {
    navigate(url);
    setIsMenuOpen(false);
  };
  return (
    <>
      <Stepper />
      <header
        className={`transition-all ease-in-out duration-500 z-50 fixed top-0 w-full  ${
          theme ? "text-red-500" : "text-white"
        } `}
      >
        <nav>
          <img src="logo512.png" alt="" />

          <div className="h-full flex">
            {/* <button className="bg-orange-100 rounded-2xl  mr-2 font-semibold italic px-5 text-orange-500">
              Book A Slot
            </button> */}
            {/* <button onClick={() => setIsMenuOpen(true)}>Menu</button> */}
            <button
              className="ml-4"
              onClick={() =>
                (window.location.href = "https://wa.me/9730534176?text=Hi")
              }
            >
              Contact
            </button>

            <button className="ml-4" onClick={() => setTheme(!theme)}>
              Switch
            </button>
          </div>
        </nav>
        <div
          className={`sidenav   bg-black/30  ${
            isMenuOpen
              ? "translate-y-0  backdrop-blur-2xl"
              : "-translate-y-full backdrop-blur-0"
          }`}
        >
          <div className="leftSideNav">
            <span onClick={() => navigateToPage("/")}>Home</span>
            <span onClick={() => navigateToPage("/about")}>about</span>
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
