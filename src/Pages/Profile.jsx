import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, clearAuth } from "../redux/slices/authSlice";
import { persistor } from "../redux/store";
import { fetchCart } from "../redux/slices/cartSlice";
import PersonalDetails from "../components/Profile/PersonalDetails";
import MyOrders from "../components/Profile/MyOrders";
import ChangePassword from "../components/Profile/ChangePassword";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState("details");

  const token = useSelector((state) => state.auth.token);
  const { user, loading: authLoading, error: authError } = useSelector(
    (state) => state.auth
  );

  const { items: cartItems, loading: cartLoading, error: cartError } =
    useSelector((state) => state.cart);

  const handleImageChange = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post(
        "https://techbay-1ej5.onrender.com/upload-profile-photo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(fetchUserProfile());
      toast.success("Profile photo updated!");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload image");
    }
  };

  useEffect(() => {
    if (token) dispatch(fetchUserProfile());
  }, [dispatch, token]);

  useEffect(() => {
    if (token) dispatch(fetchCart());
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(clearAuth());
    persistor.purge();
    navigate("/login");
  };

  if (authLoading || cartLoading)
    return <div className="text-center mt-10 text-lg">Loading...</div>;

  if (authError)
    return (
      <div className="text-center mt-10 text-red-600 text-lg">
        {authError?.message || authError}
      </div>
    );

  if (!token || !user)
    return (
      <div className="text-center mt-10 text-lg">
        Please log in to view your profile.
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* page title */}
        <h1 className="text-2xl font-semibold text-center mb-6">My Profile</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar (minimal — no duplicated detailed UI) */}
          <aside className="w-full lg:w-72">
            <div className="bg-white rounded-xl shadow p-4">
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedTab("details")}
                  className={`w-full text-left px-3 py-2 rounded-md font-medium ${
                    selectedTab === "details"
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Profile Details
                </button>

                <button
                  onClick={() => setSelectedTab("orders")}
                  className={`w-full text-left px-3 py-2 rounded-md font-medium ${
                    selectedTab === "orders"
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  My Orders
                </button>

                <button
                  onClick={() => setSelectedTab("security")}
                  className={`w-full text-left px-3 py-2 rounded-md font-medium ${
                    selectedTab === "security"
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Security
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md font-medium text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </aside>

          {/* Main content — render your components as-is (no extra wrappers) */}
          <main className="flex-1">
            {selectedTab === "details" && (
              <PersonalDetails user={user} onImageChange={handleImageChange} />
            )}

            {selectedTab === "orders" && <MyOrders />}

            {selectedTab === "security" && <ChangePassword />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
