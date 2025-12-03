import React from "react";
import { useNavigate } from "react-router-dom";

const RelatedProducts = ({ product, products, filters }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) return null;

  // =============== FILTER LOGIC FOR RELATED ITEMS ==================

  const related = products
    .filter((p) => p.category === product.category)                        // same category
    .filter((p) => p._id !== product._id)                                  // exclude current
    .filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )                                                                      // price
    .filter(
      (p) =>
        filters.selectedBrands.length === 0 ||
        filters.selectedBrands.includes(p.brand)
    )                                                                      // brand
    .filter(
      (p) =>
        filters.selectedCategories.length === 0 ||
        filters.selectedCategories.includes(p.category)
    )                                                                      // category filter
    .filter((p) => p.rating >= filters.minRating)                          // rating
    .filter((p) => (!filters.inStockOnly ? true : p.inStock === true))     // stock
    .slice(0, 4);                                                           // limit to 4 items

  if (related.length === 0) return null;

  // ==================================================================

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/products/${item._id}`)}
            className="cursor-pointer p-5 bg-white rounded-xl shadow hover:shadow-lg transition border border-gray-100"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-36 object-contain mb-3"
            />

            <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>

            <p className="text-blue-600 font-bold mt-1">
              ₹{item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
