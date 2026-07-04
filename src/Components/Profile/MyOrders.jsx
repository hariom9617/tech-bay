import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";
import { cancelOrder } from "../../redux/slices/orderSlice";
import { toast } from "react-toastify";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { PackageOpen } from "lucide-react";

const MyOrders = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { orders, loading, error } = useSelector((state) => state.orders || {});
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  


  const [detailsLoading, setDetailsLoading] = useState(false);

  const handleOrderClick = async (order) => {
    setOpenModal(true);
    setDetailsLoading(true);

    try {

      const res = await axios.get(`https://techbay-j8hr.onrender.com//order/${order._id}`
,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSelectedOrder(res.data.orders);
    if (orderData.address) {
      const addressRes = await axios.get(
        `https://techbay-j8hr.onrender.com//address/${orderData.address}`,
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Order History</h2>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton h-20 rounded-xl"></div>
          ))}
        </div>
      ) : error ? (
        <p className="text-slate-500 py-8 text-center">No Order Found</p>
      ) : orders && orders.length > 0 ? (
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="p-4 text-xs font-semibold uppercase tracking-wide">Product</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wide">Payment</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wide">Status</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wide">Total</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wide">Date</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wide"></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-slate-50 transition cursor-pointer border-t border-slate-100"
                  onClick={() => handleOrderClick(order)}   // add this
                >

                  <td className="p-4">
                    <div className="flex flex-col gap-3">
                      {order.products.map((p, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                            <img
                              src={p.product_details?.image}
                              alt="product"
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <span className="font-semibold text-sm text-slate-800">
                            {p.product_details?.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-green-50 text-green-600 text-xs font-semibold px-2.5 py-1">
                      Paid
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center rounded-full text-xs font-semibold px-2.5 py-1 ${order.status === "Delivered"
                        ? "bg-green-50 text-green-600"
                        : order.status === "Cancelled"
                          ? "bg-red-50 text-red-600"
                          : "bg-amber-50 text-amber-600"
                        }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </td>

                  <td className="p-4 text-sm font-bold text-slate-900">₹{order.amount}</td>

                  <td className="p-4 text-sm text-slate-500 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                {order.status === "Cancelled" ? (
             <span className="text-red-500 text-sm font-medium">
             Cancelled
               </span>
                 ) : (
                <button
         className="bg-amber-400 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-amber-500 transition-colors"
      onClick={(e) => {
        e.stopPropagation();
        setOrderToCancel(order._id);
        setOpenCancelModal(true);
                 }}
               disabled={loading}

                 >
            Cancel
         </button>
        )}

             </td>

                </tr>
              ))}
            </tbody>
          </table>
               {openCancelModal && (
                   <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
                <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative">

                   <h3 className="text-lg font-bold mb-2 text-center text-slate-900">
                    Cancel Order?
                 </h3>

                <p className="text-slate-500 text-sm text-center mb-6">
                 Are you sure you want to cancel this order?
                   This action cannot be undone.
                     </p>

                    <div className="flex justify-between gap-3">
                  <button
                 className="w-full bg-slate-100 text-slate-700 py-2.5 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                onClick={() => {
                 setOpenCancelModal(false);
                setOrderToCancel(null);
               }}
              >
          No, Keep
           </button>

             <button
  className="w-full bg-red-600 text-white py-2.5 rounded-xl font-semibold hover:bg-red-700 transition-colors"
  onClick={() => {
    dispatch(cancelOrder(orderToCancel))
      .unwrap()
      .then(() => {
        toast.success("Your order has been cancelled 🛑");
        setOpenCancelModal(false);
        setOrderToCancel(null);
      })
      .catch(() => {
        toast.error("Failed to cancel the order");
      });
         }}
               >
                 Yes, Cancel
                          </button>


                    </div>
                       </div>
                           </div>
                               )}

          {openModal && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex justify-center items-center p-4 z-50">
              <div className="bg-white p-6 rounded-2xl max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">

                <button
                  onClick={() => setOpenModal(false)}
                  className="absolute top-3 right-3 flex items-center justify-center h-9 w-9 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
                  >
                  <CloseIcon/>

                </button>

                <h2 className="text-xl font-bold mb-4 text-slate-900">Order Details</h2>

                {detailsLoading ? (
                  <p className="text-center py-6 text-slate-500">Loading details...</p>
                ) : selectedOrder ? (
                  <>

                    <div className="mb-4">
                      {selectedOrder.products.map((p, i) => (
                        <div key={i} className="flex items-center gap-4 border-b border-slate-100 pb-3 mb-3">
                          <img
                            src={p.product_details?.image}
                            className="w-16 h-16 rounded-xl object-contain bg-slate-100 p-1"
                          />
                          <div>
                            <p className="font-semibold text-slate-800">{p.product_details?.title}</p>
                            <p className="text-slate-500 text-sm">
                              Qty: {p.quantity} • ₹{p.product_details?.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4 space-y-1 text-sm text-slate-700 bg-slate-50 rounded-xl p-4">
                      <p><b className="text-slate-900">Total:</b> ₹{selectedOrder.amount}</p>
                      <p><b className="text-slate-900">Status:</b> {selectedOrder.status || "Pending"}</p>
                      <p><b className="text-slate-900">Date:</b> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                    </div>

                    {selectedOrder.address && (
                      <div className="text-sm text-slate-600">
                        <h3 className="font-bold text-slate-900 mb-2">Delivery Address</h3>
                        <p>{selectedOrder.address.name}</p>
                        <p>{selectedOrder.address.houseNo}, {selectedOrder.address.street}</p>
                        <p>{selectedOrder.address.city}, {selectedOrder.address.state} - {selectedOrder.address.pincode}</p>
                        <p>Mobile: {selectedOrder.address.mobile}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-center text-slate-500">No details found</p>
                )}
              </div>
            </div>
          )}


        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
            <PackageOpen size={28} />
          </div>
          <p className="text-slate-500">No orders found.</p>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

