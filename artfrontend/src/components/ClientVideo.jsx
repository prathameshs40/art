import { useEffect, useRef, useState } from "react";

const ClientVideo = ({ src }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current
        .play()
        .catch((error) => console.error("Video play failed", error));
    }
  }, [isVisible]);

  return (
    <div className="w-full max-w-4xl mx-auto opacityNGo">
      <video
        ref={videoRef}
        className="w-full h-auto"
        src={src}
        muted
        playsInline
        loop
        preload="auto"
      />
    </div>
  );
};

export default ClientVideo;
