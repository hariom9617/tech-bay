import React, { useState } from "react";
import ProductSidebar from "../Components/product/ProductSidebar";
import ProductsProduct from "../Components/product/ProductsProduct";
import { useSelector } from "react-redux";
import { SlidersHorizontal, X } from "lucide-react";

const Products = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const priceRange = useSelector((state) => state.filters.priceRange);
  const selectedCategories = useSelector(
    (state) => state.filters.selectedCategories
  );

  return (
    <main className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6">
      <div className="products-page">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 text-sm mb-4">
            <a className="text-slate-500 hover:text-brand-600 transition-colors" href="/">
              Home
            </a>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-900">Products</span>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-slate-900 text-3xl sm:text-4xl font-black tracking-tight">
              Explore Our Products
            </h1>
            <p className="text-slate-500 text-base">
              Find the best electronics from top brands
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-2">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-semibold shadow-soft hover:border-brand-400 hover:text-brand-600 transition-colors"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>
          </div>

          {/* Mobile Sidebar Overlay (Backdrop) */}
          {isSidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          {/* Mobile Sidebar */}
          <div
            className={`lg:hidden fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-slate-50 z-50 transform transition-transform duration-300 ease-out shadow-2xl
                       ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200 bg-white">
              <h2 className="font-bold text-lg text-slate-900">Filters</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center justify-center h-9 w-9 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100%-65px)] p-4">
              <ProductSidebar />
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-full lg:w-1/4 xl:w-1/5 shrink-0">
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