import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const PaymentForm = ({ selectedAddressId, prevStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.auth.token);

  // ---------------- CALCULATIONS ----------------
  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.product_details?.price) || 0;
    const qty = Number(item.quantity) || 1;
    return sum + price * qty;
  }, 0);

  const tax = subtotal * 0.18;
  const shipping = 50;
  const totalAmount = subtotal + tax + shipping;

  const [method, setMethod] = useState("razorpay");
  const [loadingPay, setLoadingPay] = useState(false);

  // ---------------- RAZORPAY SDK ----------------
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ---------------- PLACE ORDER ----------------
  const placeOrder = async (paymentId) => {
    try {
      const payload = {
        address: selectedAddressId,
        paymentId: paymentId,
        products: cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
        amount: totalAmount,
      };

      await axios.post(
        "https://techbay-1ej5.onrender.com/confirmorder",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.setItem(
        "last_order",
        JSON.stringify({
          paymentId,
          amount: totalAmount,
          items: cartItems,
          date: new Date().toISOString(),
        })
      );

      navigate("/order-success");
    } catch (error) {
      console.log("ORDER ERROR:", error.response?.data || error.message);
      alert("Error placing order.");
    } finally {
      setLoadingPay(false);
    }
  };

  // ---------------- RAZORPAY CHECKOUT ----------------
  const openRazorpay = async () => {
    if (!selectedAddressId) return alert("Select delivery address");

    setLoadingPay(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay.");
      setLoadingPay(false);
      return;
    }

    const options = {
      key: "rzp_test_RmK1eZKB9NULMh",
      amount: totalAmount * 100,
      currency: "INR",
      name: "TechBay",
      description: "Order Payment",
      handler: (response) => placeOrder(response.razorpay_payment_id),
      theme: { color: "#137fec" },
    };

    try {
      new window.Razorpay(options).open();
    } catch (err) {
      console.log("Razorpay open error:", err);
      setLoadingPay(false);
    }
  };

  // ---------------- COD Handler ----------------
  const placeCODOrder = () => placeOrder("COD_PAYMENT");

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* LEFT SECTION */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-2">Payment Method</h1>
        <p className="text-gray-500 mb-6">All transactions are secure and encrypted.</p>

        {/* Payment Options */}
        <div className="space-y-3">

          <label
            className={`block p-4 border rounded-xl cursor-pointer transition-all 
            ${method === "razorpay" ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}
            onClick={() => setMethod("razorpay")}
          >
            <div className="flex items-center gap-3">
              <input type="radio" checked={method === "razorpay"} readOnly />
              <span className="font-semibold">Razorpay</span>
            </div>
          </label>

          {/* COD */}
          <label
            className={`block p-4 border rounded-xl cursor-pointer transition-all 
            ${method === "cod" ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}
            onClick={() => setMethod("cod")}
          >
            <div className="flex items-center gap-3">
              <input type="radio" checked={method === "cod"} readOnly />
              <span className="font-semibold">Cash on Delivery (COD)</span>
            </div>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={prevStep}
            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 rounded-lg font-semibold"
          >
            Back
          </button>

          {method === "razorpay" ? (
            <button
              onClick={openRazorpay}
              disabled={loadingPay}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
            >
              {loadingPay ? "Processing..." : "Pay with Razorpay"}
            </button>
          ) : (
            <button
              onClick={placeCODOrder}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
            >
              Place COD Order
            </button>
          )}
        </div>
      </div>

      {/* RIGHT: ORDER SUMMARY */}
      <div className="bg-blue-50 border border-blue-600 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.product_id} className="flex items-center justify-between gap-3">
              
              {/* Product Image */}
              <img
                src={item.product_details?.image}
                alt={item.product_details?.title}
                className="w-16 h-16 rounded-lg object-contain  bg-white p-1"
              />

              {/* Product Info */}
              <div className="flex-1">
                <p className="font-semibold">{item.product_details?.title}</p>
                <p className="text-sm text-gray-800 line-clamp-1">
                  {item.product_details?.description}
                </p>
                <p className="text-sm text-gray-800">Qty: {item.quantity}</p>
              </div>

              {/* Price */}
              <p className="font-semibold whitespace-nowrap">₹{item.product_details?.price}</p>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax (18%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-xl font-bold mb-2">
          <span>Total</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;