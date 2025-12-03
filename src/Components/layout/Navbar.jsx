import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isLoggedIn = Boolean(token);
  const cartCount = cartItems?.length || 0;
  const wishlistCount = wishlistItems?.length || 0;

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full h-[3px] bg-blue-500"></div>

        <div className="flex justify-between items-center px-4 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center gap-10">
            <div
              className="flex items-center gap-2 text-2xl font-bold text-gray-900 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-blue-500"
              >
                <path
                  d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                  fill="currentColor"
                ></path>
              </svg>
              Techbay
            </div>

            <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-blue-600 ${
                    isActive ? "text-blue-600 font-semibold" : ""
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/product"
                className={({ isActive }) =>
                  `hover:text-blue-600 ${
                    isActive ? "text-blue-600 font-semibold" : ""
                  }`
                }
              >
                Products
              </NavLink>
            </div>
          </div>

          <div className="flex-1 max-w-xl mx-6">
            <SearchBar />
          </div>

          <div className="hidden md:flex items-center gap-6 text-gray-700">
            <div className="relative cursor-pointer">
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  `hover:text-blue-600 flex items-center gap-1 ${
                    isActive ? "text-blue-600 font-semibold" : ""
                  }`
                }
              >
                <FavoriteBorderIcon fontSize="small" />
                <span>Wishlist</span>
              </NavLink>

              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs px-[6px] py-[1px] rounded-full">
                  {wishlistCount}
                </span>
              )}
            </div>

            <div className="relative cursor-pointer">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `hover:text-blue-600 flex items-center gap-1 ${
                    isActive ? "text-blue-600 font-semibold" : ""
                  }`
                }
              >
                <ShoppingCartIcon fontSize="small" />
                <span>Cart</span>
              </NavLink>

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs px-[6px] py-[1px] rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            {!isLoggedIn ? (
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            ) : (
              <AccountCircleIcon
                onClick={() => navigate("/profile")}
                fontSize="large"
                className="cursor-pointer text-gray-700 hover:text-blue-600"
              />
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <div className="text-xl font-bold text-gray-800">Techbay</div>
          <button onClick={() => setIsOpen(false)} className="text-gray-600">
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-4 mt-6 px-6 text-gray-700 font-medium">
          {["Home", "Product", "Wishlist", "Cart"].map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="hover:text-blue-600"
            >
              {item}
            </NavLink>
          ))}

          {!isLoggedIn ? (
            <button
              className="px-10 py-2 bg-blue-500 text-white rounded"
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
            >
              Sign In
            </button>
          ) : (
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                navigate("/profile");
              }}
            >
              <AccountCircleIcon fontSize="large" />
              <span>My Profile</span>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-30 z-40"
        ></div>
      )}
    </>
  );
};

export default Navbar;
