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
        "https://techbay-1ej5.onrender.com/change-password",
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
    <div className="bg-white p-6 rounded-xl shadow w-full">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Current Password */}
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-900 mb-1"
          >
            Current Password
          </label>
          <input
            id="currentPassword"
            type="password"
            placeholder="Enter your current password"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* New + Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-900 mb-1"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-900 mb-1"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <p className="text-xs text-gray-500">
          Password must be at least 8 characters long, contain uppercase,
          lowercase, and a number.
        </p>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
