import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

const MyOrders = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { orders, loading, error } = useSelector((state) => state.orders || {});
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [detailsLoading, setDetailsLoading] = useState(false);

  const handleOrderClick = async (order) => {
    setOpenModal(true);
    setDetailsLoading(true);

    try {

      const res = await axios.get(`https://techbay-1ej5.onrender.com/order/${order._id}`
,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSelectedOrder(res.data.orders);
    if (orderData.address) {
      const addressRes = await axios.get(
        `https://techbay-1ej5.onrender.com/address/${orderData.address}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      addressObj = addressRes.data.address; 
    }

    setSelectedOrder({
      ...orderData,
      address: addressObj,
    });
    
    } catch (err) {
      console.log("Error fetching order details:", err);
    }

    setDetailsLoading(false);
  };

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
                  className="border-b hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => handleOrderClick(order)}   // add this
                >

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

                  <td className="p-4 text-sm font-medium text-green-600">
                    Paid
                  </td>

                  <td
                    className={`p-4 text-sm font-medium ${order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Cancelled"
                        ? "text-red-600"
                        : "text-yellow-500"
                      }`}
                  >
                    {order.status || "Pending"}
                  </td>
        
                  <td className="p-4 text-sm font-semibold">₹{order.amount}</td>
               
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {openModal && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center p-4">
              <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow relative">

                <button
                  onClick={() => setOpenModal(false)}
                  className="absolute top-3 right-3 text-red-600 font-bold"
                  >
                  <CloseIcon/>
                  
                </button>

                <h2 className="text-xl font-semibold mb-4">Order Details</h2>

                {detailsLoading ? (
                  <p className="text-center py-6">Loading details...</p>
                ) : selectedOrder ? (
                  <>

                    <div className="mb-4">
                      {selectedOrder.products.map((p, i) => (
                        <div key={i} className="flex items-center gap-4 border-b pb-3 mb-3">
                          <img
                            src={p.product_details?.image}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium">{p.product_details?.title}</p>
                            <p className="text-gray-500 text-sm">
                              Qty: {p.quantity} • ₹{p.product_details?.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4">
                      <p><b>Total:</b> ₹{selectedOrder.amount}</p>
                      <p><b>Status:</b> {selectedOrder.status || "Pending"}</p>
                      <p><b>Date:</b> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                    </div>

                    {selectedOrder.address && (
                      <div>
                        <h3 className="font-semibold mb-2">Delivery Address</h3>
                        <p>{selectedOrder.address.name}</p>
                        <p>{selectedOrder.address.houseNo}, {selectedOrder.address.street}</p>
                        <p>{selectedOrder.address.city}, {selectedOrder.address.state} - {selectedOrder.address.pincode}</p>
                        <p>Mobile: {selectedOrder.address.mobile}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-center text-gray-500">No details found</p>
                )}
              </div>
            </div>
          )}


        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;