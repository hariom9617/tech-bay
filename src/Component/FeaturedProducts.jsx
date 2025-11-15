import React, { useEffect, useState } from "react";
import axios from "axios";

const FeaturedProducts = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get("http://192.168.29.133:5001/feature");
        setFeatured(res.data);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading)
    return <p className="px-4 text-gray-600">Loading featured products...</p>;

  return (
    <div className=" min-h-screen py-10 px-6">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-left">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featured.map((product, index) => {
          const { id, title, description, price, image, category } = product;
          return (
            <div
              key={id || product._id || index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-[4/3] bg-gray-100">
                <img
                  src={image}
                  alt={title}
                  className="w-full bg-center aspect-square bg-cover"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300x200?text=No+Image")
                  }
                />
              </div>
              <div className="p-4 flex flex-col justify-between h-[150px]">
                <div>
                  <p className="text-text-primary-light dark:text-black text-base font-medium leading-normal">
                    {title}
                  </p>
                  <p className="text-black-500 text-l mt-1 truncate">
                    {category}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-text-primary-light dark:text-black text-lg font-bold">
                    ₹{price}
                  </p>
                  <button className="flex items-center justify-center rounded-lg h-9 w-9 bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">
                      add_shopping_cart
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
