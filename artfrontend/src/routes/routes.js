import { Routes, Route } from "react-router-dom";
import Home from "./../pages/homePage";
import About from "./../pages/aboutPage";
function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default Router;
