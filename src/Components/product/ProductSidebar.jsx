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

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://techbay-1ej5.onrender.com/products")
      .then((res) => {
        const products = Array.isArray(res.data)
          ? res.data
          : res.data?.products || [];
        setAllProducts(products);
      })
      .catch(console.error);
  }, []);

  const brands = Array.from(
    new Set(allProducts.map((p) => p.brand).filter(Boolean))
  );
  const categories = Array.from(
    new Set(
      allProducts.map((p) => p.category || p.categoryName).filter(Boolean)
    )
  );

  return (
    <div
      className="
      border border-gray-200 shadow-md w-64 p-5 rounded-lg bg-white 
      max-h-[85vh] overflow-y-auto 
      lg:max-h-none lg:overflow-visible
    "
    >
      <h1 className="font-bold text-gray-700 mb-4">Filters</h1>

      <div className="mb-2">
        <h2 className="font-bold text-gray-800 mb-2">Price Range</h2>
        <Slider
          value={priceRange}
          onChange={(e, val) => dispatch(setPriceRange(val))}
          valueLabelDisplay="auto"
          min={0}
          max={5000}
          step={500}
          sx={{ color: "#2563eb" }}
        />
      </div>

      <div className="mb-4">
        <h2 className="font-bold text-gray-900 mb-0">Minimum Rating</h2>
        <Slider
          value={minRating}
          onChange={(e, val) => dispatch(setMinRating(val))}
          valueLabelDisplay="auto"
          min={1}
          max={5}
          step={1}
          sx={{ color: "#facc15" }}
        />
        <div className="text-sm text-gray-600 mt-1">{minRating}★ above</div>
      </div>

      <div className="mb-2">
        <h2 className="font-bold text-gray-900 mb-2">Category</h2>
        {categories.map((cat) => (
          <label
            key={cat}
            className="flex items-center font-semibold  gap-2 mb-1"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => dispatch(toggleCategory(cat))}
              className="accent-blue-600 h-4 w-4 border border-gray-300 rounded appearance-none focus:ring-2 focus:ring-blue-500 checked:appearance-auto"
            />
            {cat}
          </label>
        ))}
      </div>

      <div className="mb-2">
        <h2 className="font-bold text-gray-900 mb-2">Brands</h2>
        {brands.map((b) => (
          <label key={b} className="flex items-center font-semibold gap-2 mb-1">
            <input
              type="checkbox"
              checked={selectedBrands.includes(b)}
              onChange={() => dispatch(toggleBrand(b))}
              className="accent-blue-600 h-4 w-4 border border-gray-300 rounded appearance-none focus:ring-2 focus:ring-blue-500 checked:appearance-auto"
            />
            {b}
          </label>
        ))}
      </div>

      <div className="mb-2">
        <h2 className="font-bold text-gray-900 mb-2">Availability</h2>
        <label className="flex items-center font-semibold  gap-2 mb-1">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => dispatch(setInStock(e.target.checked))}
            className="accent-blue-600 h-4 w-4 border border-gray-300 rounded appearance-none focus:ring-2 focus:ring-blue-500 checked:appearance-auto"
          />
          In Stock Only
        </label>
      </div>
    </div>
  );
};

export default ProductSidebar;
