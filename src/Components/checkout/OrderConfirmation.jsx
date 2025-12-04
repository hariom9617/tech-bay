import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";  

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const passedOrder = location.state?.order || null;
  const storedOrder = JSON.parse(localStorage.getItem("last_order"));

  const [order, setOrder] = useState(passedOrder || storedOrder || null);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    confetti({
      particleCount: 170,
      startVelocity: 45,
      spread: 70,
      origin: { y: 0.6 }
    });

    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });

      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading order...</div>;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-xl">
          <h2 className="text-2xl font-bold mb-4">Order confirmation</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the order details. If your payment succeeded,
            please check "My Orders".
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/profile")}
              className="px-5 py-3 bg-black text-white rounded"
            >
              View My Orders
            </button>
            <button
              onClick={() => navigate("/products")}
              className="px-5 py-3 border rounded"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const {
    _id,
    paymentId,
    products = [],
    amount,
    address = {},
    createdAt,
  } = order;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-3xl w-full">
        <div className="flex justify-center mb-6">
          <CheckCircle size={80} className="text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Order Confirmed!
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Thank you — your payment was successful.
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-500">Order ID</div>
            <div className="font-medium">{_id ?? "N/A"}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-500">Payment ID</div>
            <div className="font-medium">{paymentId}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-500">Amount Paid</div>
            <div className="font-medium">₹{amount}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500">Date</div>
            <div className="font-medium">
              {createdAt
                ? new Date(createdAt).toLocaleString()
                : new Date().toLocaleString()}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 font-semibold">Items</h3>
          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.product_id} className="flex justify-between">
                <div>
                  <div className="font-medium">
                    {p.product_details?.title ?? p.name ?? "Product"}
                  </div>
                  <div className="text-sm text-gray-500">Qty: {p.quantity}</div>
                </div>
                <div className="font-medium">
                  ₹{p.product_details?.price ?? p.price ?? 0}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/products")}
            className="flex-1 py-3 bg-black text-white rounded-lg"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex-1 py-3 border border-gray-300 rounded-lg"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
