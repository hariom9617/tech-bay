import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Products from "./Pages/Products";
import Wishlist from "./Pages/WishList";
import Search from "./Pages/Search";
import Profile from "./Pages/Profile";

// Components
import AddressFormPage from "./Component/AddressForm";
import PaymentFormPage from "./Component/PaymentForm";
import OrderConfirmPage from "./Component/OrderConfirmationPage";
import CheckoutPage from "./Pages/CheckoutPage";
import SingleProductPage from "./Pages/SingleProductPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<Products />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<SingleProductPage></SingleProductPage>}/>

        {/* Checkout workflow */}
        <Route path="/checkout" element={<Navigate to="/checkout/address" replace />} />
        <Route path="/checkout/address" element={<AddressFormPage />} />
        <Route path="/checkout/payment" element={<PaymentFormPage />} />
        <Route path="/order-confirm" element={<OrderConfirmPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
