import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TextAnimation = () => {
  const textRef = useRef(null);

  useEffect(() => {
    // Animate the text on component mount
    gsap.fromTo(
      textRef.current,
      { opacity: 0, scale:3 }, // Starting state
      { opacity: 1,  duration: 0.5, ease: "power1"  , scale:1} // Ending state
    );
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 ref={textRef} className="text-white">
        Hello, GSAP!
      </h1>
    </div>
  );
};

export default TextAnimation;
