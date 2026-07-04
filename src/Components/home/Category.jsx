import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetFilters, toggleCategory } from "../../redux/slices/filterSlice";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://techbay-j8hr.onrender.com");

        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.categories || res.data?.data || [];

        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          throw new Error("Unexpected API format — not an array");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (cat) => {
    const categoryName = cat.categoryName;
    dispatch(resetFilters());
    dispatch(toggleCategory(categoryName));
    navigate("/product");
  };

  const SectionHeading = () => (
    <div className="mb-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
        Shop by Category
      </h2>
      <p className="text-slate-500 mt-1 text-sm sm:text-base">
        Browse our most popular collections
      </p>
    </div>
  );

  if (loading)
    return (
      <div className="container mx-auto px-4 py-4">
        <SectionHeading />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="skeleton aspect-square rounded-2xl"
            ></div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-6">
        Error fetching categories: {error}
      </div>
    );

  if (!categories || categories.length === 0)
    return (
      <div className="text-center mt-6 text-slate-500">
        No categories found.
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-4">
      <SectionHeading />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id || cat.id}
            onClick={() => handleCategoryClick(cat)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-square ring-1 ring-slate-900/5 shadow-soft hover:shadow-lift transition-all duration-300"
          >
            <img
              src={cat.image}
              alt={cat.categoryName}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/300x300?text=No+Image")
              }
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
              <h3 className="text-white text-sm sm:text-base font-bold truncate drop-shadow">
                {cat.categoryName || "Unnamed Category"}
              </h3>
              <span className="text-white/80 text-xs font-medium opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Shop now →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
