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
      .get("https://techbay-1ej5.onrender.com/feature")
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
              transform: translateY(-6px) scale(1.03);
              box-shadow: 0 12px 32px rgba(0,0,0,0.12);
            }
          }
        `}
      </style>

      <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
        Featured Products
      </h2>

      <div className="absolute top-[72px] left-0 h-[400px] w-16 bg-gradient-to-r from-gray-100 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-[72px] right-0 h-[400px] w-16 bg-gradient-to-l from-gray-100 to-transparent z-20 pointer-events-none"></div>

      <button
        className="btn-prev absolute top-1/2 left-2 -translate-y-1/2 bg-white shadow-lg border 
                   border-gray-300 rounded-full h-10 w-10 flex items-center justify-center z-30"
      >
        ❮
      </button>

      <button
        className="btn-next absolute top-1/2 right-2 -translate-y-1/2 bg-white shadow-lg border 
                   border-gray-300 rounded-full h-10 w-10 flex items-center justify-center z-30"
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
              className="premium-card bg-white border border-gray-200 rounded-xl shadow-sm 
                         transition-all duration-300 overflow-hidden card"
            >
              <div
                className="w-[260px] sm:w-[300px] md:w-[300px] lg:w-[300px] xl:w-[320px] h-48 sm:h-52 md:h-56 
                              bg-gray-100 flex items-center justify-center overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/400x300?text=No+Image")
                  }
                />
              </div>

              <div className="p-4 flex flex-col justify-between h-[150px]">
                <div>
                  <p className="text-gray-800 text-base font-semibold truncate">
                    {product.title}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {product.category}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-lg font-bold text-gray-900">
                    ₹{product.price}
                  </p>

                  <button className="h-9 w-9 flex justify-center items-center bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
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
