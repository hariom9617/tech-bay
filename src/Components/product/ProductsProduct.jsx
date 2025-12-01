import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToWishlist } from "../../redux/slices/wishlistSlice";

const ProductsProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userToken = useSelector((state) => state.auth.token);

  const { products, loading, error } = useSelector((state) => state.products);

  const {
    priceRange,
    selectedCategories,
    selectedBrands,
    minRating,
    inStockOnly,
  } = useSelector((state) => state.filters);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange, selectedCategories, selectedBrands, minRating, inStockOnly]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600 mt-10">Error: {error}</div>;
  if (!products || products.length === 0)
    return <div className="text-center mt-10">No products found.</div>;

  const getFieldStrings = (product, keys) => {
    const out = [];
    keys.forEach((key) => {
      const val = product?.[key];
      if (!val) return;

      if (Array.isArray(val)) {
        val.forEach((v) => out.push(typeof v === "string" ? v : v.name));
      } else if (typeof val === "object") {
        out.push(val.name);
      } else {
        out.push(val);
      }
    });
    return out.filter(Boolean).map((s) => s.trim());
  };

  const filteredProducts = products.filter((product) => {
    const price = Number(product.price ?? 0);

    if (price < priceRange[0] || price > priceRange[1]) return false;

    if (selectedCategories.length > 0) {
      const prodCats = getFieldStrings(product, [
        "category",
        "categories",
        "categoryName",
      ]).map((c) => c.toLowerCase());

      const match = selectedCategories.some((c) =>
        prodCats.includes(c.toLowerCase())
      );

      if (!match) return false;
    }

    if (selectedBrands.length > 0) {
      if (!selectedBrands.includes(product.brand)) return false;
    }

    if (product.rating < minRating) return false;

    if (inStockOnly && !product.inStock) return false;

    return true;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center mt-10">No products match your filters.</div>
    );
  }

  const indexLast = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexLast - productsPerPage,
    indexLast
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleAddToCart = (productId) => {
    if (!userToken) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }
    dispatch(addToCart({ productId, quantity: 1 }));
    alert("Added to cart!");
  };

  const handleAddToWishlist = (productId) => {
    if (!userToken) {
      alert("Please log in to add items to your wishlist.");
      navigate("/login");
      return;
    }
    dispatch(addToWishlist({ productId }));
    alert("Added to wishlist!");
  };

  return (
    <div className="container mx-auto px-4 md:px-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-black mb-4 text-center">
        All Products ({filteredProducts.length})
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/products/${product._id}`)}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
          >
            <div className="p-2 sm:p-4 bg-gray-100 flex items-center justify-center">
              <img
                className="h-32 sm:h-40 md:h-48 w-auto object-contain transition-transform group-hover:scale-105"
                src={product.image}
                alt=""
              />
            </div>
            <div className="flex flex-col p-3 sm:p-4 flex-grow">
              <h3 className="text-sm sm:text-base font-bold mb-1 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-base sm:text-lg md:text-xl font-black mt-auto">
                ${product.price}
              </p>
            </div>

            <div className="flex items-center px-3 mb-3 sm:mb-5">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-yellow-500"
                  style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}
                >
                  {i < Math.round(product.rating) ? "star" : "star_border"}
                </span>
              ))}
              <span className="text-gray-500 text-[10px] sm:text-[12px] ml-1">
                {product.rating} / 5
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center mb-2 px-2 gap-2">
              <button
                className="flex-1 bg-[#f6f7f8] text-[#137fec] rounded-lg h-8 sm:h-9 font-bold text-xs sm:text-sm hover:bg-[#137fec] hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product._id);
                }}
              >
                Add to Cart
              </button>

              <button
                className="flex items-center justify-center rounded-lg h-8 sm:h-9 w-8 sm:w-9 bg-gray-100 hover:bg-gray-200 text-black hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWishlist(product._id);
                }}
              >
                <FavoriteBorderOutlined />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center my-6 sm:my-8">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, val) => setCurrentPage(val)}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default ProductsProduct;
