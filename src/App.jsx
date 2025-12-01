import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Products from "./Pages/Products";
import Wishlist from "./Pages/WishList";
import Profile from "./Pages/Profile";
import SingleProductPage from "./Pages/SingleProductPage";
import Checkout from "./Pages/Checkout";

// Layout Components
import Navbar from "./Components/layout/Navbar";   // ✅ adjust path if needed

const App = () => {
  return (
    <BrowserRouter>

      {/* ✅ NAVBAR WILL APPEAR ON EVERY PAGE */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<Products />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

    </BrowserRouter>
  );
};

export default App;
