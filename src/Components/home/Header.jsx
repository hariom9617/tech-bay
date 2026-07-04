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
    <div className="w-full px-3 sm:px-6 lg:px-10 pt-5">
      <div className="relative w-full max-w-[1400px] mx-auto overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_12px_40px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/5">
        <div
          className="flex"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: transitionEnabled ? "transform 1s ease-in-out" : "none",
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {extended.map((img, index) => (
            <div
              key={index}
              className="min-w-full bg-slate-100 flex items-center justify-center overflow-hidden h-[38vh] sm:h-[46vh] md:h-[52vh] lg:h-[46vh]"
            >
              <img
                src={img}
                className="w-full h-full object-cover"
                alt="banner"
              />
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20
            h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center rounded-full
            bg-white/80 backdrop-blur-md shadow-lg text-slate-700
            hover:bg-brand-500 hover:text-white transition-all"
          aria-label="Previous slide"
        >
          ❮
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20
            h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center rounded-full
            bg-white/80 backdrop-blur-md shadow-lg text-slate-700
            hover:bg-brand-500 hover:text-white transition-all"
          aria-label="Next slide"
        >
          ❯
        </button>

        <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
          {banners.map((_, idx) => {
            const isActive =
              (current - 1 + banners.length) % banners.length === idx;
            return (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive ? "w-7 bg-white" : "w-2 bg-white/50"
                }`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;
