import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      await axios.post(
        "https://techbay-j8hr.onrender.com/changepassword",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Password updated successfully!");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Password change error:", err);
      toast.error(err.response?.data?.error || "Failed to update password.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft w-full">
      <h2 className="text-lg font-bold text-slate-900 mb-1">Change Password</h2>
      <p className="text-sm text-slate-500 mb-6">
        Keep your account secure with a strong password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

        {/* Current Password */}
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-semibold text-slate-700 mb-1.5"
          >
            Current Password
          </label>
          <input
            id="currentPassword"
            type="password"
            placeholder="Enter your current password"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
        </div>

        {/* New + Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
          </div>
        </div>

        <p className="text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2">
          Password must be at least 8 characters long, contain uppercase,
          lowercase, and a number.
        </p>

        <button
          type="submit"
          className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm shadow-sm shadow-brand-500/30 transition-colors"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;