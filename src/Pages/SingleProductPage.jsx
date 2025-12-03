import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchSingleProduct } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";

import { toast } from "react-toastify";

// Components
import ProductDetails from "../Components/singleproduct/ProductDetails";
import RelatedProducts from "../Components/singleproduct/RelatedProducts";
import CustomerReviews from "../Components/singleproduct/CustomerReviews";

const SingleProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);

  // Fetch single product + all products
  const { singleProduct: product, loading, error, products } = useSelector(
    (state) => state.products
  );

  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id, dispatch]);

  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!product) return <div className="text-center mt-10">Product not found</div>;

  // ================= HANDLERS =================

  const handleAddToCart = (quantity = 1) => {
    if (!token) {
      toast.warn("Please login to add items to cart");
      navigate("/login");
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity }));
    toast.success("Added to cart");
  };

  const handleAddToWishlist = () => {
    if (!token) {
      toast.warn("Please login to add items to wishlist");
      navigate("/login");
      return;
    }
    dispatch(addToWishlist({ productId: product._id }));
    toast.success("Added to wishlist");
  };

  const handleBuyNow = () => {
    if (!token) {
      toast.warn("Please login to continue");
      navigate("/login");
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
    navigate("/checkout");
  };

  // ==================================================

  return (
    <div className="container mx-auto px-6 py-10">

      {/* PRODUCT DETAILS */}
      <ProductDetails
        product={product}
        handleAddToCart={handleAddToCart}
        handleAddToWishlist={handleAddToWishlist}
        handleBuyNow={handleBuyNow}
      />

      {/* CUSTOMER REVIEWS */}
      <CustomerReviews />

      {/* RELATED PRODUCTS */}
      <RelatedProducts
        product={product}
        products={products}
        filters={filters}
      />

    </div>
  );
};

export default SingleProductPage;
