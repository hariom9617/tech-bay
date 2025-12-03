import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { orders, loading, error } = useSelector((state) => state.orders || {});

  useEffect(() => {
    if (token) dispatch(fetchOrders());
  }, [dispatch, token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600";
      case "Cancelled":
        return "text-red-600";
      default:
        return "text-yellow-500";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Order History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">No Order Found</p>
      ) : orders && orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="p-4 text-sm font-semibold">Product Name</th>
                <th className="p-4 text-sm font-semibold">Payment</th>
                <th className="p-4 text-sm font-semibold">Status</th>
                <th className="p-4 text-sm font-semibold">Total</th>
                <th className="p-4 text-sm font-semibold">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* PRODUCT LIST INSIDE ONE CELL */}
                  <td className="p-4">
                    <div className="flex flex-col gap-4">
                      {order.products.map((p, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden border">
                            <img
                              src={p.product_details?.image}
                              alt="product"
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <span className="font-medium text-sm">
                            {p.product_details?.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* PAYMENT */}
                  <td className="p-4 text-sm font-medium text-green-600">
                    Paid
                  </td>

                  {/* STATUS */}
                  <td
                    className={`p-4 text-sm font-medium ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Cancelled"
                        ? "text-red-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {order.status || "Pending"}
                  </td>

                  {/* TOTAL */}
                  <td className="p-4 text-sm font-semibold">₹{order.amount}</td>

                  {/* DATE */}
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
