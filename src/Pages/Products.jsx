import React, { useState } from "react";
import Footer from "../Components/layout/Footer";
import ProductSidebar from "../Components/product/ProductSidebar";
import ProductsProduct from "../Components/product/ProductsProduct";
import { useSelector } from "react-redux";

const Products = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const priceRange = useSelector((state) => state.filters.priceRange);
  const selectedCategories = useSelector(
    (state) => state.filters.selectedCategories
  );

  return (
    <main className="container mx-auto px-4 py-4">
      <div className="products-page">
        <div className="mb-5 px-4 sm:px-5">
          <div className="flex flex-wrap gap-2 text-lg mb-0">
            <a
              className="text-gray-500 dark:text-gray-400 hover:text-[#137fec]"
              href="#"
            >
              Home
            </a>
            <span className="text-gray-500">/</span>
            <span className="font-medium text-[#111418]">Products</span>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <h1 className="text-[#111418] text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
              Explore Our Products
            </h1>
            <p className="text-gray-500 text-base font-normal leading-normal">
              Find the best electronics from top brands
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">

          <div className="lg:hidden flex justify-center items-center mb-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="bg-[#137fec] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0e5a9e] transition-colors"
            >
              Filters
            </button>
          </div>

          {isSidebarOpen && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg w-11/12 max-w-sm relative">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>

                <ProductSidebar />
              </div>
            </div>
          )}

          <div className="hidden lg:block w-full lg:w-1/4 xl:w-1/5 flex-shrink-0">
            <ProductSidebar />
          </div>

          <div className="w-full lg:w-3/4 xl:w-4/5">
            <ProductsProduct
              priceRange={priceRange}
              selectedCategories={selectedCategories}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
