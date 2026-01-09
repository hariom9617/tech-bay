import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setPriceRange,
  toggleCategory,
  toggleBrand,
  setMinRating,
  setInStock,
} from "../../redux/slices/filterSlice";

const ProductSidebar = () => {
  const dispatch = useDispatch();

  const {
    priceRange,
    selectedCategories,
    selectedBrands,
    minRating,
    inStockOnly,
  } = useSelector((state) => state.filters);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // 🔹 Fetch categories from products
  useEffect(() => {
    axios
      .get("https://techbay-j8hr.onrender.com")
      .then((res) => {
        const products = Array.isArray(res.data)
          ? res.data
          : res.data?.products || [];

        const catsSet = new Set(
          products
            .flatMap((p) => {
              if (p.category)
                return Array.isArray(p.category)
                  ? p.category
                  : [p.category];
              if (p.categories) return p.categories;
              if (p.categoryName) return [p.categoryName];
              return [];
            })
            .map((c) => (typeof c === "string" ? c : c?.name))
            .filter(Boolean)
        );

        setCategories([...catsSet]);
      })
      .catch((err) => console.error("Category fetch error:", err));
  }, []);

  // 🔹 Fetch brands from products
  useEffect(() => {
    axios
      .get("https://techbay-j8hr.onrender.com/products")
      .then((res) => {
        const products = Array.isArray(res.data)
          ? res.data
          : res.data?.products || [];

        const brandSet = new Set(
          products
            .map((p) =>
              typeof p.brand === "string" ? p.brand : p.brand?.name
            )
            .filter(Boolean)
        );

        setBrands([...brandSet]);
      })
      .catch((err) => console.error("Brand fetch error:", err));
  }, []);

  return (
    <div className="border border-gray-200 shadow-md w-64 p-5 rounded-lg bg-white max-h-[85vh] overflow-y-auto">
      <h1 className="font-bold text-gray-700 mb-4">Filters</h1>

      {/* 💰 Price Range */}
      <div className="mb-4">
        <h2 className="font-bold text-gray-800 mb-2">Price Range</h2>
        <Slider
          value={priceRange}
          onChange={(e, val) => dispatch(setPriceRange(val))}
          valueLabelDisplay="auto"
          min={0}
          max={5000000}
          step={500}
          sx={{ color: "#2563eb" }}
        />
      </div>

      {/* ⭐ Rating */}
      <div className="mb-4">
        <h2 className="font-bold text-gray-900 mb-2">Minimum Rating</h2>
        <Slider
          value={minRating}
          onChange={(e, val) => dispatch(setMinRating(val))}
          valueLabelDisplay="auto"
          min={1}
          max={5}
          step={1}
          sx={{ color: "#facc15" }}
        />
        <div className="text-sm text-gray-600 mt-1">{minRating}★ & above</div>
      </div>

      {/* 🗂 Categories */}
      <div className="mb-4">
        <h2 className="font-bold text-gray-900 mb-2">Category</h2>
        {categories.length ? (
          categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 mb-1 font-semibold"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => dispatch(toggleCategory(cat))}
                className="accent-blue-600 h-4 w-4"
              />
              {cat}
            </label>
          ))
        ) : (
          <div className="text-gray-500">No categories found</div>
        )}
      </div>

      {/* 🏷 Brands */}
      <div className="mb-4">
        <h2 className="font-bold text-gray-900 mb-2">Brands</h2>
        {brands.length ? (
          brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 mb-1 font-semibold"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => dispatch(toggleBrand(brand))}
                className="accent-blue-600 h-4 w-4"
              />
              {brand}
            </label>
          ))
        ) : (
          <div className="text-gray-500">No brands found</div>
        )}
      </div>

      {/* 📦 Stock */}
      <div>
        <h2 className="font-bold text-gray-900 mb-2">Availability</h2>
        <label className="flex items-center gap-2 font-semibold">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => dispatch(setInStock(e.target.checked))}
            className="accent-blue-600 h-4 w-4"
          />
          In Stock Only
        </label>
      </div>
    </div>
  );
};

export default ProductSidebar;
