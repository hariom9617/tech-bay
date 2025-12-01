import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCartLocal } from "../../redux/slices/cartSlice";

const PaymentForm = ({ selectedAddressId }) => {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.auth.token);

  const totalAmount = cartItems.reduce((sum, item) => {
    const price = Number(item.product_details?.price) || 0;
    const qty = Number(item.quantity) || 1;
    return sum + price * qty;
  }, 0);

  const [method, setMethod] = useState("card");
  const [loadingPay, setLoadingPay] = useState(false);

  const dispatch = useDispatch();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

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

      console.log("ORDER PAYLOAD SENT:", payload);

      await axios.post(
        "https://techbay-1ej5.onrender.com/confirmorder",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem(
        "last_order",
        JSON.stringify({
          paymentId,
          amount: totalAmount,
          items: cartItems,
          // address: selectedAddressIdDetails,
          date: new Date().toISOString(),
        })
      );

      navigate("/order-success");
    } catch (error) {
      console.log(
        "ORDER ERROR:",
        error.response?.data || error.message || error
      );
      alert("Error placing order. See console for details.");
    } finally {
      setLoadingPay(false);
    }
  };

  const openRazorpay = async () => {
    if (!selectedAddressId) {
      alert("Please select a delivery address before paying.");
      return;
    }

    if (totalAmount <= 0) {
      alert("Cart total is 0 — cannot proceed to payment.");
      return;
    }

    setLoadingPay(true);

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      setLoadingPay(false);
      return;
    }

    console.log("Total Amount Sent to Razorpay:", totalAmount);

    const options = {
      key: "rzp_test_RmK1eZKB9NULMh",
      amount: Number(totalAmount) * 100,
      currency: "INR",
      name: "TechBay",
      description: "Order Payment",

      handler: function (response) {
        placeOrder(response.razorpay_payment_id);
      },

      theme: {
        color: "#137fec",
      },
    };

    try {
      new window.Razorpay(options).open();
    } catch (err) {
      console.log("Razorpay open error:", err);
      setLoadingPay(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-2">Payment Method</h1>
        <p className="text-gray-500 mb-6">
          All transactions are secure and encrypted.
        </p>

        {/* Payment options */}
        <div className="space-y-3">
          <label
            className={`block p-4 border rounded-xl cursor-pointer ${
              method === "card"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => setMethod("card")}
          >
            <div className="flex items-center gap-3">
              <input type="radio" checked={method === "card"} readOnly />
              <span className="font-semibold">Credit / Debit Card</span>
            </div>
          </label>

          <label
            className={`block p-4 border rounded-xl cursor-pointer ${
              method === "paypal"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => setMethod("paypal")}
          >
            <div className="flex items-center gap-3">
              <input type="radio" checked={method === "paypal"} readOnly />
              <span className="font-semibold">PayPal</span>
            </div>
          </label>

          <label
            className={`block p-4 border rounded-xl cursor-pointer ${
              method === "gpay"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => setMethod("gpay")}
          >
            <div className="flex items-center gap-3">
              <input type="radio" checked={method === "gpay"} readOnly />
              <span className="font-semibold">Google Pay</span>
            </div>
          </label>
        </div>

        {/* Card form */}
        {method === "card" && (
          <div className="mt-6 space-y-4 border-t pt-6">
            <div>
              <label className="block mb-1 font-medium">Cardholder Name</label>
              <input
                type="text"
                placeholder="John M. Doe"
                className="border w-full p-3 rounded-lg bg-gray-900 text-white"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Card Number</label>
              <input
                type="text"
                maxLength="16"
                placeholder="1234 5678 9123 0000"
                className="border w-full p-3 rounded-lg bg-gray-900 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Expiry (MM/YY)</label>
                <input
                  type="text"
                  placeholder="12/25"
                  className="border w-full p-3 rounded-lg bg-gray-900 text-white"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">CVV</label>
                <input
                  type="password"
                  maxLength="3"
                  placeholder="123"
                  className="border w-full p-3 rounded-lg bg-gray-900 text-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order summary */}
      <div className="border rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.product_id} className="flex justify-between">
              <div>
                <p className="font-semibold">{item.product_details?.title}</p>
                <p className="text-sm text-gray-500">
                  {item.product_details?.description}
                </p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">₹{item.product_details?.price}</p>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-bold text-xl mb-4">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>

        <button
          onClick={openRazorpay}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg"
          disabled={loadingPay || !selectedAddressId || totalAmount <= 0}
        >
          {loadingPay ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
