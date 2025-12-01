import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="flex flex-row m-5 relative">
      <button
        className="md:hidden h-8 w-8 bg-blue-600 text-white rounded-full shadow"
        onClick={() => setIsSidebarOpen(true)}
      >
        <MenuIcon />
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`border border-gray-200 shadow-md w-64 p-5 rounded-lg bg-white
          fixed top-0 left-0 h-full z-50 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:w-64`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-gray-700">Filters</h1>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        <div className="mb-2">
          <h2 className="font-medium text-gray-800 mb-2">Price Range</h2>
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
          <h2 className="font-semibold text-gray-900 mb-0">Minimum Rating</h2>

          <Slider
            value={minRating}
            onChange={(e, val) => dispatch(setMinRating(val))}
            valueLabelDisplay="auto"
            min={1}
            max={5}
            step={1}
            sx={{ color: "#facc15" }} // yellow/star color
          />

          <div className="text-sm text-gray-600 mt-1">{minRating}★ above</div>
        </div>

        <div className="mb-2">
          <h2 className="font-semibold text-gray-900 mb-2">Category</h2>
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => dispatch(toggleCategory(cat))}
                className="accent-blue-600"
              />
              {cat}
            </label>
          ))}
        </div>

        <div className="mb-2">
          <h2 className="font-semibold text-gray-900 mb-2">Brands</h2>
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => dispatch(toggleBrand(b))}
                className="accent-blue-600"
              />
              {b}
            </label>
          ))}
        </div>

        <div className="mb-2">
          <h2 className="font-semibold text-gray-900 mb-2">Availability</h2>
          <label className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => dispatch(setInStock(e.target.checked))}
              className="accent-blue-600"
            />
            In Stock Only
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductSidebar;
