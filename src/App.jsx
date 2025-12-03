import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  return (
    <BrowserRouter>
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
        <Route path="/order-success" element={<OrderConfirmation />} />
      </Routes>
      <Footer />
      <ToastNortification></ToastNortification>
    </BrowserRouter>
  );
};

export default App;
