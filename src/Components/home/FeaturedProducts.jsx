import React, { useEffect, useState } from "react";
import api from "../../services/Api";

const FeaturedProducts = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        console.log("API URL:", import.meta.env.VITE_API_URL);

        const res = await api.get("/feature");
        console.log("Featured products response:", res.data);

        setFeatured(res.data);
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError("Failed to load featured products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading)
    return <p className="px-4 text-gray-600">Loading featured products...</p>;
  if (error) return <p className="px-4 text-red-600">{error}</p>;
  if (featured.length === 0)
    return (
      <p className="px-4 text-gray-600">No featured products available.</p>
    );

  return (
    <div className="min-h-screen py-10 px-6">
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
