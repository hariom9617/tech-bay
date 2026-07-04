import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, clearAuth } from "../redux/slices/authSlice";
import { persistor } from "../redux/store";
import { fetchCart } from "../redux/slices/cartSlice";
import PersonalDetails from "../Components/Profile/PersonalDetails";
import MyOrders from "../Components/Profile/MyOrders";
import ChangePassword from "../Components/Profile/ChangePassword";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, ShoppingBag, ShieldCheck, LogOut, Lock } from "lucide-react";

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
        "https://techbay-j8hr.onrender.com/upload-profile-photo",
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
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500">
        <div className="skeleton h-14 w-14 rounded-full mb-4"></div>
        Loading your profile...
      </div>
    );

  if (authError)
    return (
      <div className="text-center py-24 text-red-500 text-lg">
        {authError?.message || authError}
      </div>
    );

  if (!token || !user)
    return (
      <div className="flex flex-col items-center justify-center text-center py-24 px-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 text-brand-500 mb-6">
          <Lock size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Please log in</h2>
        <p className="text-slate-500 mt-2 max-w-sm">
          Sign in to view and manage your profile, orders, and addresses.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 px-6 py-3 bg-brand-500 text-white font-semibold rounded-xl shadow-sm shadow-brand-500/30 hover:bg-brand-600 transition-colors"
        >
          Sign In
        </button>
      </div>
    );

  const tabs = [
    { key: "details", label: "Profile Details", icon: User },
    { key: "orders", label: "My Orders", icon: ShoppingBag },
    { key: "security", label: "Security", icon: ShieldCheck },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-6">
          My Profile
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 lg:shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-4 lg:sticky lg:top-24">
              {/* Profile summary */}
              <div className="flex items-center gap-3 p-2 mb-4">
                <img
                  src={user?.image || "https://via.placeholder.com/90"}
                  alt="Profile"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-100"
                />
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate">
                    {user?.username}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="h-px bg-slate-100 mb-3"></div>

              <div className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = selectedTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setSelectedTab(tab.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                        active
                          ? "bg-brand-50 text-brand-700"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
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
