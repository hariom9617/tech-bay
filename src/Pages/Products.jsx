import React, { useState } from "react";
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
              href="/"
            >
              Home
            </a>
            <span className="text-gray-500">/</span>
            <span className="font-medium text-[#111418]">Products</span>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <h1 className="text-[#111418] text-3xl sm:text-4xl font-black">
              Explore Our Products
            </h1>
            <p className="text-gray-500 text-base">
              Find the best electronics from top brands
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Mobile Filter Button */}
          <div className="lg:hidden flex justify-center items-center mb-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-[#137fec] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0e5a9e]"
            >
              Filters
            </button>
          </div>

          {/* Mobile Sidebar Overlay (Backdrop) */}
          {isSidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          {/* Mobile Sidebar */}
          <div
            className={`lg:hidden fixed left-0 top-0 h-full w-72 bg-white z-40 transform transition-transform duration-300 ease-in-out shadow-xl
                       ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 text-gray-700 text-2xl hover:text-gray-900 z-50"
            >
              ✕
            </button>

            <div className="overflow-y-auto h-full pt-12 px-4 pb-5">
              <ProductSidebar />
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-full lg:w-1/4 xl:w-1/5 flex-shrink-0">
            <ProductSidebar />
          </div>

          {/* Products Grid */}
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