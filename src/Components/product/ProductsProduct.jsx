import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { PackageSearch, SearchX, Star } from "lucide-react";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToWishlist } from "../../redux/slices/wishlistSlice";
import { toast } from "react-toastify";
import axios from "axios";

const ProductsProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // 🔥 detect search query

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
  const [searchResults, setSearchResults] = useState(null);
  const productsPerPage = 12;

  // 🔥 1️⃣ Fetch search results OR all products
  useEffect(() => {
    if (query) {
      // SEARCH MODE
      const fetchSearch = async () => {
        try {
          const res = await axios.get(
            `https://techbay-j8hr.onrender.com/products/search?q=${query}`
          );
          setSearchResults(res.data.products);
        } catch (err) {
          console.log("Search error:", err);
          setSearchResults([]);
        }
      };

      fetchSearch();
    } else {
      // NORMAL MODE
      dispatch(fetchProducts());
      setSearchResults(null);
    }
  }, [query, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange, selectedCategories, selectedBrands, minRating, inStockOnly]);

  // ⏳ Loading states
  if (loading && !searchResults)
    return (
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
            >
              <div className="skeleton h-40 sm:h-48"></div>
              <div className="p-4 space-y-3">
                <div className="skeleton h-4 w-3/4 rounded"></div>
                <div className="skeleton h-4 w-1/3 rounded"></div>
                <div className="skeleton h-8 w-full rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  // 🔥 Pick correct data source
  const activeProducts = searchResults ?? products;

  if (!activeProducts || activeProducts.length === 0)
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-500 mb-5">
          <PackageSearch size={38} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">No products found</h3>
        <p className="text-slate-500 mt-1 max-w-sm">
          We couldn't find any products right now. Please check back soon.
        </p>
      </div>
    );

  // FILTERS
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

  const filteredProducts = activeProducts.filter((product) => {
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
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 text-amber-500 mb-5">
          <SearchX size={38} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">No matches</h3>
        <p className="text-slate-500 mt-1 max-w-sm">
          No products match your current filters. Try adjusting the price,
          rating, or category.
        </p>
      </div>
    );
  }

  // PAGINATION
  const indexLast = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexLast - productsPerPage,
    indexLast
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // CART + WISHLIST
  const handleAddToCart = (productId) => {
    if (!userToken) {
      toast.warn("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }
    dispatch(addToCart({ productId, quantity: 1 }));
    toast.success("Added to cart!");
  };

  const handleAddToWishlist = (productId) => {
    if (!userToken) {
      toast.warn("Please log in to add items to your wishlist.");
      navigate("/login");
      return;
    }
    dispatch(addToWishlist({ productId }));
    toast.success("Added to wishlist!");
  };

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          All Products{" "}
          <span className="text-slate-400 font-semibold">
            ({filteredProducts.length})
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/products/${product._id}`)}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift cursor-pointer"
          >
            <div className="relative p-4 bg-slate-100 flex items-center justify-center h-40 sm:h-48 overflow-hidden">
              <img
                className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                src={product.image}
                alt={product.title}
              />
              <button
                className="absolute top-3 right-3 flex items-center justify-center h-9 w-9 rounded-full bg-white/90 backdrop-blur shadow-md text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWishlist(product._id);
                }}
                aria-label="Add to wishlist"
              >
                <FavoriteBorderOutlined fontSize="small" />
              </button>
            </div>

            <div className="flex flex-col p-3 sm:p-4 grow">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 line-clamp-2">
                {product.title}
              </h3>

              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.round(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-200 text-slate-200"
                      }
                    />
                  ))}
                </div>
                <span className="text-slate-400 text-[11px] sm:text-xs ml-1">
                  {product.rating}
                </span>
              </div>

              <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-auto">
                ₹{product.price}
              </p>
            </div>

            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
              <button
                className="w-full bg-brand-50 text-brand-600 rounded-xl h-9 sm:h-10 font-bold text-xs sm:text-sm hover:bg-brand-500 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product._id);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center my-8">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, val) => setCurrentPage(val)}
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              borderRadius: "12px",
              fontWeight: 600,
              color: "#475569",
            },
            "& .Mui-selected": {
              backgroundColor: "#137fec !important",
              color: "#fff",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProductsProduct;
