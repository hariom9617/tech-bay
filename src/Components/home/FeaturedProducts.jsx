import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";


const FeaturedProducts = () => {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://techbay-j8hr.onrender.com//feature")
      .then((res) => setFeatured(res.data))
      .catch((err) => console.error("Error fetching featured:", err));
  }, []);

  if (!featured.length) return null;

  return (
    <div className="py-8 px-4 max-w-[1400px] mx-auto relative">
      <style>
        {`
          @media (hover: hover) {
            .premium-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 12px 32px rgba(15,23,42,0.12);
            }
          }
        `}
      </style>

      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Featured Products
        </h2>
        <p className="text-slate-500 mt-1 text-sm sm:text-base">
          Hand-picked deals just for you
        </p>
      </div>

      <div className="absolute top-24 left-0 h-[380px] w-12 bg-linear-to-r from-slate-50 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-24 right-0 h-[380px] w-12 bg-linear-to-l from-slate-50 to-transparent z-20 pointer-events-none"></div>

      <button
        className="btn-prev absolute top-1/2 left-1 -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-lg
                   rounded-full h-11 w-11 flex items-center justify-center z-30 text-slate-700
                   hover:bg-brand-500 hover:text-white transition-all"
        aria-label="Previous"
      >
        ❮
      </button>

      <button
        className="btn-next absolute top-1/2 right-1 -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-lg
                   rounded-full h-11 w-11 flex items-center justify-center z-30 text-slate-700
                   hover:bg-brand-500 hover:text-white transition-all"
        aria-label="Next"
      >
        ❯
      </button>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".btn-next",
          prevEl: ".btn-prev",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        centeredSlides={true}
        centeredSlidesBounds={true}
        slidesPerView={"auto"}
        spaceBetween={24}
        className="pb-6 pt-2"
      >
        {featured.map((product, index) => (
          <SwiperSlide
            key={product._id || index}
            style={{ width: "auto" }}
            className="flex justify-center"
          >
            <div
              onClick={() => navigate(`/products/${product._id}`)}
              className="premium-card cursor-pointer bg-white border border-slate-200 rounded-2xl shadow-soft
                         transition-all duration-300 overflow-hidden group"
            >
              <div className="w-[260px] sm:w-[300px] xl:w-[320px] h-48 sm:h-56 bg-slate-100 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/400x300?text=No+Image")
                  }
                />
              </div>

              <div className="p-4 flex flex-col justify-between h-[150px]">
                <div>
                  <p className="text-slate-900 text-base font-bold truncate">
                    {product.title}
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    {product.category}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-xl font-extrabold text-slate-900">
                    ₹{product.price}
                  </p>

                  <button className="h-10 w-10 flex justify-center items-center bg-brand-50 text-brand-600 rounded-xl hover:bg-brand-500 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">
                      add_shopping_cart
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedProducts;
