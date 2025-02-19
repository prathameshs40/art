import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/homePage";
import About from "../pages/aboutPage";

function AppRouter() {  // Renamed from "Router" to "AppRouter"
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
  );
}

export default AppRouter;
