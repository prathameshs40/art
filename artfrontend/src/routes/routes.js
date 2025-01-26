import { Routes, Route } from "react-router-dom";
import Home from "./../pages/homePage";
import About from "./../pages/aboutPage";
import Test from "./../pages/testPage";
import TestTrigger from "../pages/testTrigger";
function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/test" element={<Test />} />
        <Route path="/TestTrigger" element={<TestTrigger />} />
      </Routes>
    </>
  );
}

export default Router;
