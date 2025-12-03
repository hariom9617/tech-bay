import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  removeFromWishlist,
} from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";

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
      <div className="text-center mt-10 text-lg font-semibold">
        Please log in to view your wishlist.
      </div>
    );

  if (loading)
    return <div className="text-center mt-10 text-lg">Loading...</div>;

  if (error)
    return (
      <div className="text-center mt-10 text-red-500 text-lg">{error}</div>
    );

  if (!items.length)
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Your wishlist is empty.
      </div>
    );

  return (
    <div className="w-full flex flex-col items-center py-10">

      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-1">
        My Wishlist
      </h1>
      <p className="text-center text-gray-500 mb-10 text-sm">
        Your curated collection of must-have tech.
      </p>

      <div className="max-w-[1100px] w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {items.map((item) => {
          const p = item.product_details;

          return (
            <div
              key={item.product_id}
              className="
              bg-white border border-gray-200 rounded-2xl 
              shadow-sm hover:shadow-lg transition-all 
              p-4 relative flex flex-col cursor-pointer 
              transform hover:scale-[1.03] 
            "
            >

              <button
                onClick={() =>
                  dispatch(removeFromWishlist({ productId: item.product_id }))
                }
                className="absolute top-3 right-3 bg-white h-8 w-8 flex items-center justify-center rounded-full shadow hover:scale-110 transition"
              >
                <Favorite className="text-red-500 text-sm" />
              </button>

              <div
                className="w-full h-28 sm:h-32 bg-gray-100 rounded-xl flex justify-center items-center mb-4"
                onClick={() => navigate(`/products/${item.product_id}`)}
              >
                <img
                  src={p?.image}
                  alt={p?.title}
                  className="max-h-20 sm:max-h-24 object-contain"
                />
              </div>

              <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                {p?.title}
              </h3>

              <p className="text-gray-700 font-bold text-[14px] mb-4">
                ₹{p?.price}
              </p>

              <button
                onClick={() => {
                  dispatch(
                    addToCart({ productId: item.product_id, quantity: 1 })
                  );
                  toast.success("Added to cart!");
                }}
                className="
                bg-[#137fec] hover:bg-blue-700 text-white 
                w-full rounded-xl py-2 text-sm font-semibold 
                transition 
              "
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
