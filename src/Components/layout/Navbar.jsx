import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isLoggedIn = Boolean(token);
  const cartCount = cartItems?.length || 0;
  const wishlistCount = wishlistItems?.length || 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = [
    { title: "Home", path: "/", icon: <HomeIcon /> },
    { title: "Products", path: "/product", icon: <CategoryIcon /> },
    { title: "Wishlist", path: "/wishlist", icon: <FavoriteBorderIcon /> },
    { title: "Cart", path: "/cart", icon: <ShoppingCartIcon /> },
  ];

  const Logo = ({ onClick }) => (
    <div
      className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900 cursor-pointer"
      onClick={onClick}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 shadow-sm shadow-brand-500/30">
        <svg
          fill="none"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
        >
          <path
            d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
      Techbay
    </div>
  );

  return (
    <>
      <nav
        className={`w-full sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-slate-200 shadow-sm"
            : "bg-white border-slate-100"
        }`}
      >
        <div className="h-[3px] w-full bg-linear-to-r from-brand-400 via-brand-500 to-brand-700"></div>

        <div className="flex justify-between items-center gap-4 px-4 sm:px-8 lg:px-12 py-3.5 max-w-[1500px] mx-auto">
          <div className="flex items-center gap-8">
            <Logo onClick={() => navigate("/")} />

            <div className="hidden md:flex items-center gap-1 text-slate-600 font-medium">
              {[
                { to: "/", label: "Home" },
                { to: "/product", label: "Products" },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-lg transition-colors hover:text-brand-600 hover:bg-brand-50 ${
                      isActive ? "text-brand-600 font-semibold" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex-1 max-w-xl hidden sm:block">
            <SearchBar />
          </div>

          <div className="hidden md:flex items-center gap-2 text-slate-700">
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `relative flex items-center justify-center h-10 w-10 rounded-xl transition-colors hover:bg-slate-100 hover:text-brand-600 ${
                  isActive ? "text-brand-600 bg-brand-50" : ""
                }`
              }
              title="Wishlist"
            >
              <FavoriteBorderIcon fontSize="small" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-brand-500 text-white text-[10px] font-semibold rounded-full ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative flex items-center justify-center h-10 w-10 rounded-xl transition-colors hover:bg-slate-100 hover:text-brand-600 ${
                  isActive ? "text-brand-600 bg-brand-50" : ""
                }`
              }
              title="Cart"
            >
              <ShoppingCartIcon fontSize="small" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-orange-500 text-white text-[10px] font-semibold rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {!isLoggedIn ? (
              <button
                onClick={() => navigate("/login")}
                className="ml-1 px-5 py-2 bg-brand-500 text-white text-sm font-semibold rounded-xl shadow-sm shadow-brand-500/30 hover:bg-brand-600 hover:shadow-md transition-all"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => navigate("/profile")}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-brand-600 transition-colors"
                title="Profile"
              >
                <AccountCircleIcon fontSize="large" />
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center h-10 w-10 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile search row */}
        <div className="sm:hidden px-4 pb-3">
          <SearchBar />
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-[60] transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100">
          <Logo
            onClick={() => {
              setIsOpen(false);
              navigate("/");
            }}
          />
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center h-9 w-9 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-1 mt-4 px-4 text-slate-700 font-medium">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl transition-colors hover:bg-brand-50 hover:text-brand-600 ${
                  isActive ? "bg-brand-50 text-brand-600 font-semibold" : ""
                }`
              }
            >
              {item.icon}
              {item.title}
            </NavLink>
          ))}

          <div className="mt-4 px-1">
            {!isLoggedIn ? (
              <button
                className="w-full py-2.5 bg-brand-500 text-white font-semibold rounded-xl shadow-sm shadow-brand-500/30 hover:bg-brand-600 transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/login");
                }}
              >
                Sign In
              </button>
            ) : (
              <div
                className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer hover:bg-slate-100"
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
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Navbar;
