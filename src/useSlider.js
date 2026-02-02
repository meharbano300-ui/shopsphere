import { useState, useEffect } from 'react';

// Sirf Hook ka logic 
export const useSlider = (totalSlides, interval = 4000) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(timer);
  }, [totalSlides, interval]);

  return activeSlide;
};

