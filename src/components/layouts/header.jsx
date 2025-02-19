import { useNavigate } from "react-router-dom";
import SiteContext from "../../context/siteContext";
import Stepper from "./stepper";
import { gsap } from "gsap";
import { useContext, useEffect } from "react";
function Header() {
  const { isMenuOpen, theme, setTheme, setIsMenuOpen } =
    useContext(SiteContext);
  const navigate = useNavigate();
  const navigateToPage = (url) => {
    navigate(url);
    setIsMenuOpen(false);
  };
  useEffect(() => {
    console.log("theme changed", theme);
  }, [setTheme, theme]);
  useEffect(() => {
    document.querySelectorAll(".entryAni").forEach((element, index) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 2, // Adjust duration as needed
          delay: index * 0.2, // Stagger effect
          ease: "power2.out", // Smooth easing
        }
      );
    });
  }, []);
  return (
    <>
      <Stepper />
      <header
        className={`transition-all ease-in-out duration-500 z-40 fixed top-0 w-full  ${
          theme ? "text-prime-white-1 " : " text-prime-dark-3"
        } `}
      >
        <nav>
          <img className="entryAni" src="logo512.png" alt="" />

          <div className="h-full flex">
            {/* <button className="bg-orange-100 rounded-2xl  mr-2 font-semibold italic px-5 text-orange-500">
              Book A Slot
            </button> */}
            <button
              className="mr-4 entryAni"
              onClick={() => {
                if (theme) {
                  // document.documentElement.classList.remove("dark");
                  // localStorage.setItem("theme", "light");
                } else {
                  // document.documentElement.classList.add("dark");
                  // localStorage.setItem("theme", "dark");
                }
                setTheme(!theme);
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.33333 16.6667C12.9283 16.6667 16.6667 12.9283 16.6667 8.33333C16.6667 3.73833 12.9283 0 8.33333 0C3.73833 0 0 3.73833 0 8.33333C0 12.9283 3.73833 16.6667 8.33333 16.6667ZM8.33333 1.66667C12.0092 1.66667 15 4.6575 15 8.33333C15 12.0092 12.0092 15 8.33333 15C4.6575 15 1.66667 12.0092 1.66667 8.33333C1.66667 4.6575 4.6575 1.66667 8.33333 1.66667Z"
                  fill="#FF0C0C"
                />
                <path
                  d="M12.4141 12.4175C13.508 11.3236 14.1226 9.83985 14.1226 8.29276C14.1226 6.74566 13.508 5.26193 12.4141 4.16797L4.16448 12.4175C5.25845 13.5115 6.74218 14.1261 8.28927 14.1261C9.83637 14.1261 11.3201 13.5115 12.4141 12.4175Z"
                  fill="#FF0C0C"
                />
              </svg>
            </button>
            <button
              className="mr-4 entryAni"
              onClick={() =>
                (window.location.href = "https://wa.me/9730534176?text=Hi")
              }
            >
              Contact
              {/* <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0559 9.21279C11.8833 9.05594 11.6565 8.97228 11.4234 8.97949C11.1903 8.98669 10.9691 9.0842 10.8065 9.25141L8.6571 11.4617C8.13974 11.3629 7.09962 11.0387 6.02897 9.97082C4.95832 8.89934 4.63407 7.85661 4.53796 7.34288L6.74663 5.19274C6.91407 5.03029 7.01172 4.80908 7.01893 4.57591C7.02614 4.34274 6.94233 4.11591 6.78525 3.94343L3.46641 0.294312C3.30926 0.121292 3.09085 0.0163428 2.85756 0.00175297C2.62428 -0.0128368 2.39449 0.0640823 2.21701 0.216174L0.267917 1.8876C0.112628 2.04344 0.0199414 2.25085 0.00743885 2.47049C-0.00603415 2.69503 -0.262919 8.01378 3.86161 12.1398C7.4598 15.7368 11.967 16 13.2083 16C13.3897 16 13.5011 15.9946 13.5307 15.9928C13.7504 15.9805 13.9577 15.8874 14.1128 15.7315L15.7834 13.7816C15.9356 13.6043 16.0127 13.3745 15.9983 13.1413C15.9839 12.908 15.8791 12.6896 15.7062 12.5323L12.0559 9.21279Z"
                  fill="#F81616"
                />
              </svg> */}
            </button>

            <button
              className="mr-4 entryAni"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Menu
            </button>
          </div>
        </nav>
        <div
          className={`sidenav   ${
            isMenuOpen
              ? " backdrop-blur-new"
              : "opacity-0 pointer-events-none backdrop-blur-0"
          }`}
        >
          <div className="leftSideNav">
            <span onClick={() => navigateToPage("/")} className="hero-title">
              Home
            </span>
            <span
              onClick={() => navigateToPage("/about")}
              className="hero-title"
            >
              about
            </span>
          </div>
          <div className="rightSideNav">
            {/* <span onClick={() => setIsMenuOpen(false)}>close</span> */}
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
