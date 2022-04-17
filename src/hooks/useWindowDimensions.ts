import { useState, useEffect } from "react";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
};

type WindowDimensions = {
  width: number;
  height: number;
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
    { width: 1920, height: 1080 }
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    handleResize()
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
