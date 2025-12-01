import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Banner Images
  const banners = [
    "https://res.cloudinary.com/dliimops5/image/upload/v1764600234/theme-image-1764325574384_exrcht.avif",
    "https://res.cloudinary.com/dliimops5/image/upload/v1764600233/theme-image-1764055540609_pk8zuq.avif",
    "https://res.cloudinary.com/dliimops5/image/upload/v1764600233/theme-image-1764244389108_w6k10q.avif",
  ];

  // Duplicate first & last image for infinite loop
  const extended = [
    banners[banners.length - 1],
    ...banners,
    banners[0],
  ];

  const [current, setCurrent] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const touchStartX = useRef(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Infinite loop correction
  useEffect(() => {
    if (current === extended.length - 1) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrent(1);
      }, 1200);
    }
    if (current === 0) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrent(banners.length);
      }, 1200);
    }

    // Re-enable transition
    const timer = setTimeout(() => setTransitionEnabled(true), 50);
    return () => clearTimeout(timer);
  }, [current]);

  const nextSlide = () => setCurrent((prev) => prev + 1);
  const prevSlide = () => setCurrent((prev) => prev - 1);

  // Touch Swipe
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (touchStartX.current - endX > 50) nextSlide();
    if (endX - touchStartX.current > 50) prevSlide();
  };

  return (
    <div className="relative w-full h-[40vh] md:h-[30vh] lg:h-[40vh] overflow-hidden">

      {/* Slider Wrapper */}
      <div
        className="absolute inset-0 flex"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: transitionEnabled ? "transform 1.2s ease-in-out" : "none",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {extended.map((img, index) => (
          <div
            key={index}
            className="min-w-full h-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-3xl bg-black/40 hover:bg-black/70 p-2 rounded-full"
      >
        ❮
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-3xl bg-black/40 hover:bg-black/70 p-2 rounded-full"
      >
        ❯
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {banners.map((_, idx) => {
          const active = (current - 1 + banners.length) % banners.length === idx;

          return (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                active ? "bg-white scale-125" : "bg-white/40"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
