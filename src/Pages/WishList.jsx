import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  removeFromWishlist,
} from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { Heart, Lock } from "lucide-react";
import { toast } from "react-toastify";

const WishlistState = ({ icon, title, subtitle, cta, onCta }) => (
  <div className="flex flex-col items-center justify-center text-center py-24 px-4">
    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 text-brand-500 mb-6">
      {icon}
    </div>
    <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    <p className="text-slate-500 mt-2 max-w-sm">{subtitle}</p>
    {cta && (
      <button
        onClick={onCta}
        className="mt-6 px-6 py-3 bg-brand-500 text-white font-semibold rounded-xl shadow-sm shadow-brand-500/30 hover:bg-brand-600 transition-colors"
      >
        {cta}
      </button>
    )}
  </div>
);

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const { items, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (token) dispatch(fetchWishlist());
  }, [dispatch, token]);

  if (!token)
    return (
      <WishlistState
        icon={<Lock size={40} />}
        title="Please log in"
        subtitle="Sign in to view and manage your saved wishlist items."
        cta="Sign In"
        onCta={() => navigate("/login")}
      />
    );

  if (loading)
    return <div className="text-center py-24 text-slate-500">Loading...</div>;

  if (error)
    return (
      <div className="text-center py-24 text-red-500">{error}</div>
    );

  if (!items.length)
    return (
      <WishlistState
        icon={<Heart size={40} />}
        title="Your wishlist is empty"
        subtitle="Tap the heart on any product to save it here for later."
        cta="Discover Products"
        onCta={() => navigate("/product")}
      />
    );

  return (
    <div className="w-full flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-black tracking-tight text-center mb-1 text-slate-900">
        My Wishlist
      </h1>
      <p className="text-center text-slate-500 mb-10 text-sm">
        Your curated collection of must-have tech.
      </p>

      <div className="max-w-[1200px] w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item) => {
          const p = item.product_details;

          return (
            <div
              key={item.product_id}
              className="group bg-white border border-slate-200 rounded-2xl shadow-soft hover:shadow-lift transition-all duration-300 hover:-translate-y-1 p-4 relative flex flex-col"
            >
              <button
                onClick={() =>
                  dispatch(removeFromWishlist({ productId: item.product_id }))
                }
                className="absolute top-3 right-3 bg-white h-9 w-9 flex items-center justify-center rounded-full shadow-md hover:scale-110 transition z-10"
                aria-label="Remove from wishlist"
              >
                <Favorite className="text-red-500" fontSize="small" />
              </button>

              <div
                className="w-full h-32 sm:h-36 bg-slate-100 rounded-xl flex justify-center items-center mb-4 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/products/${item.product_id}`)}
              >
                <img
                  src={p?.image}
                  alt={p?.title}
                  className="max-h-24 sm:max-h-28 object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <h3 className="text-sm font-semibold text-slate-900 mb-1 line-clamp-1">
                {p?.title}
              </h3>

              <p className="text-slate-900 font-extrabold text-base mb-4">
                ₹{p?.price}
              </p>

              <button
                onClick={() => {
                  dispatch(
                    addToCart({ productId: item.product_id, quantity: 1 })
                  );
                  toast.success("Added to cart!");
                }}
                className="mt-auto bg-brand-500 hover:bg-brand-600 text-white w-full rounded-xl py-2.5 text-sm font-semibold transition-colors"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
