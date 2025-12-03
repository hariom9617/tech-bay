import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders || {});
  const [address, setAddress] = useState(null);

  // Step 1: Ensure orders are loaded
  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(fetchOrders());
    }
  }, [dispatch]);

  // Step 2: Find order
  const order = orders?.find((o) => o._id === id);

  // Step 3: Fetch address after order is found
  useEffect(() => {
    if (order && order.address) {
      axios
        .get(`https://techbay-1ej5.onrender.com/address/${order.address}`)
        .then((res) => setAddress(res.data))
        .catch((err) => console.log("Address fetch error:", err));
    }
  }, [order]);

  if (!order) return <p>Loading order...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Order Details</h2>

      {/* Product List */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Products</h3>

        <div className="flex flex-col gap-3">
          {order.products.map((p, i) => (
            <div key={i} className="flex items-center gap-4 pb-3">
              <img
                src={p.product_details.image}
                alt=""
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium">{p.product_details.title}</p>
                <p className="text-gray-500 text-sm">
                  Qty: {p.quantity} • ₹{p.product_details.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Summary</h3>
        <p>Total Amount: <b>₹{order.amount}</b></p>
        <p>Status: {order.status || "Pending"}</p>
        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>

        {address ? (
          <div className="text-gray-700 leading-relaxed">
            <p>{address.name}</p>
            <p>{address.houseNo}, {address.street}</p>
            <p>{address.city}, {address.state} - {address.pincode}</p>
            <p>Mobile: {address.mobile}</p>
          </div>
        ) : (
          <p className="text-gray-500">Fetching address...</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
