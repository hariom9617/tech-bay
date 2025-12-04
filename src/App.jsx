import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Products from "./Pages/Products";
import Wishlist from "./Pages/WishList";
import Profile from "./Pages/Profile";
import SingleProductPage from "./Pages/SingleProductPage";
import Checkout from "./Pages/Checkout";
import OrderConfirmation from "./Components/checkout/OrderConfirmation";
import ToastNortification from "./Components/ToastNortification";
import Navbar from "./Components/layout/Navbar";
import Footer from "./Components/layout/Footer";

const App = () => {
  const location = useLocation();
  const noFooter = ["/login", "/signup", "/checkout"];

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Products />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderConfirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {!noFooter.includes(location.pathname) && <Footer />}

      <ToastNortification />
    </>
  );
};

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
