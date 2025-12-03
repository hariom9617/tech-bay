import React, { useEffect, useRef, useState } from "react";

const Header = () => {
  const banners = [
    "https://res.cloudinary.com/dliimops5/image/upload/v1764600234/theme-image-1764325574384_exrcht.avif",
    "https://res.cloudinary.com/dliimops5/image/upload/v1764600233/theme-image-1764055540609_pk8zuq.avif",
    "https://res.cloudinary.com/dliimops5/image/upload/v1764600233/theme-image-1764244389108_w6k10q.avif",
  ];

  const extended = [banners[banners.length - 1], ...banners, banners[0]];
  const [current, setCurrent] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const touchStartX = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (current === extended.length - 1) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrent(1);
      }, 1000);
    }
    if (current === 0) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrent(banners.length);
      }, 1000);
    }
    setTimeout(() => setTransitionEnabled(true), 30);
  }, [current]);

  const nextSlide = () => setCurrent((p) => p + 1);
  const prevSlide = () => setCurrent((p) => p - 1);

  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    const end = e.changedTouches[0].clientX;
    if (touchStartX.current - end > 50) nextSlide();
    if (end - touchStartX.current > 50) prevSlide();
  };

  return (
    <div className="relative w-full bg-white overflow-hidden">

      <div
        className="flex transition-all"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: transitionEnabled ? "transform 1s ease-in-out" : "none",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {extended.map((img, index) => (
          <div key={index} className="min-w-full bg-white flex items-center justify-center">
            <img
              src={img}
              className="w-full h-auto object-contain"
              alt="banner"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 
          bg-white shadow-lg border rounded-full h-10 w-10 flex items-center justify-center
          text-gray-700 hover:bg-blue-600 hover:text-white transition"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 
          bg-white shadow-lg border rounded-full h-10 w-10 flex items-center justify-center
          text-gray-700 hover:bg-blue-600 hover:text-white transition"
      >
        ❯
      </button>

      <div className="absolute bottom-4 w-full flex justify-center gap-3 z-20">
        {banners.map((_, idx) => {
          const isActive = (current - 1 + banners.length) % banners.length === idx;
          return (
            <div
              key={idx}
              className={`h-3 w-3 rounded-full transition 
                ${isActive ? "bg-white scale-125" : "bg-white/40"}`}
            ></div>
          );
        })}
      </div>

    </div>
  );
};

export default Header;
