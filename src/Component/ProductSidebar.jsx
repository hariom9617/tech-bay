import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import axios from "axios";
import ProductsProduct from "./ProductsProduct";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const ProductSidebar = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // MOBILE SIDEBAR STATE

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://192.168.29.133:5002/products");

        const products = Array.isArray(res.data)
          ? res.data
          : res.data?.products || [];

        setAllProducts(products);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    fetchAllProducts();
  }, []);

  const handlePriceChange = (event, newValue) => setPriceRange(newValue);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="flex flex-row m-5 relative">

   <button
  className="md:hidden h-8 w-8  bg-blue-600 text-white rounded-full shadow"
  onClick={() => setIsSidebarOpen(true)}
>
  <MenuIcon />
</button>



      {/*  OVERLAY */}
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
          md:static md:translate-x-0 md:w-64
        `}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-gray-700">Filters</h1>

          <button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h2 className="font-medium text-gray-800 mb-2">Price Range</h2>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={5000}
            step={200}
            sx={{ color: "#2563eb" }}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-900 mb-2">
            Category
          </h2>

          {Array.from(new Set(allProducts.map((p) => p.category || p.categoryName)))
            .filter(Boolean)
            .sort()
            .map((item) => (
              <label key={item} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(item)}
                  onChange={() => handleCategoryChange(item)}
                  className="accent-blue-600 cursor-pointer"
                />
                <span>{item}</span>
              </label>
            ))}
        </div>
      </div>

      <div className="flex-1 ml-0 md:ml-5 mt-3 md:mt-0">
        <ProductsProduct
          selectedCategories={selectedCategories}
          priceRange={priceRange}
        />
      </div>
    </div>
  );
};

export default ProductSidebar;