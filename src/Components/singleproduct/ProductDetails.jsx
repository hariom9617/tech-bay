import React, { useState } from "react";
import { toast } from "react-toastify";

const ProductDetails = ({
  product,
  token,
  handleAddToCart,
  handleAddToWishlist,
  handleBuyNow,
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col lg:flex-row gap-10 bg-white p-8 rounded-xl shadow-lg">

      {/* Product Image */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-80 h-80 object-contain rounded-lg shadow-md hover:scale-105 transition-transform"
        />
      </div>

      <div className="flex-1 space-y-4">

        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

        <p className="text-gray-600 text-base leading-relaxed">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="material-symbols-outlined text-yellow-500"
              style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}
            >
              {i < Math.round(product.rating) ? "star" : "star_border"}
            </span>
          ))}
          <span className="text-gray-500 text-sm ml-1">
            {product.rating} / 5
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-extrabold text-green-600">
            ₹{product.price}
          </span>
          <span className="text-gray-400 line-through">
            ₹{product.original_price}
          </span>
          {product.discountPercentage && (
            <span className="text-sm font-semibold text-red-500">
              ({product.discountPercentage}% OFF)
            </span>
          )}
        </div>

        {/* Details */}
        <div className="text-sm text-gray-700 space-y-1">
          <p><b>Brand:</b> {product.brand}</p>
          <p><b>Category:</b> {product.category}</p>

          <p>
            <b>Availability:</b>{" "}
            {product.inStock ? (
              <span className="text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-red-500 font-medium">Out of Stock</span>
            )}
          </p>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3 mt-4">
          <p className="font-semibold">Quantity:</p>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border px-3 py-1 rounded-lg"
          >
            {[1, 2, 3, 4, 5].map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={() => handleAddToCart(quantity)}
          >
            Add to Cart
          </button>

          <button
            className="flex-1 bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-600 transition"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>

        <button
          className="w-full bg-gray-200 font-semibold py-2 rounded-lg hover:bg-gray-300 transition"
          onClick={handleAddToWishlist}
        >
          Add to Wishlist ❤️
        </button>

      </div>
    </div>
  );
};

export default ProductDetails;
