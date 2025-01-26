import React, { useEffect } from "react";
import gsap from "gsap";

function Test() {
  useEffect(() => {
    const letters = document.querySelectorAll(".letterAnimation");

    gsap.fromTo(
      letters,
      { opacity: 0, scale: 1.05 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power1.out", // Smoother easing
      }
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-9xl uppercase tracking-prime">
        {"OrcaPixel".split("").map((letter, index) => (
          <span key={index} className="letterAnimation inline-block">
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
}

export default Test;
