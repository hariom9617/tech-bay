import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchSingleProduct } from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToWishlist } from "../../redux/slices/wishlistSlice";

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const { singleProduct: product, loading, error } = useSelector(
    (state) => state.products
  );

  // Fetch product on mount
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id, dispatch]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-600 mt-10">
        Error loading product
      </div>
    );
  if (!product)
    return (
      <div className="text-center mt-10">No products available</div>
    );

  // --- Add to Cart Logic ---
  const handleAddToCart = () => {
    if (!token) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    dispatch(addToCart({ productId: product._id, quantity: 1 }));
    alert("Added to cart!");
  };

  // --- Add to Wishlist Logic ---
  const handleAddToWishlist = () => {
    if (!token) {
      alert("Please log in to add items to your wishlist.");
      navigate("/login");
      return;
    }

    dispatch(addToWishlist({ productId: product._id }));
    alert("Added to wishlist!");
  };

  return (
    <>
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10 bg-white p-8 rounded-xl shadow-lg">

          <div className="flex-1 flex justify-center items-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-80 h-80 object-contain rounded-lg shadow-sm hover:scale-105 transition-transform"
            />
          </div>

          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-gray-600 text-base leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={"material-symbols-outlined text-yellow-500"}
                  style={{
                    fontSize: 22,
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  {i < Math.round(product.rating) ? "star" : "star_border"}
                </span>
              ))}
              <span className="text-gray-500 text-sm ml-1">
                {product.rating} / 5
              </span>
            </div>

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

            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
              <p>
                <span className="font-semibold">Availability:</span>{" "}
                {product.inStock ? (
                  <span className="text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="text-red-500 font-medium">Out of Stock</span>
                )}
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <button
                className="flex-1 bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-600 transition"
                onClick={handleAddToWishlist}
              >
                Buy Now
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductPage;
