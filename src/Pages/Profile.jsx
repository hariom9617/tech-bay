import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/slices/authSlice";
import { fetchCart } from "../redux/slices/cartSlice";
import { Box, Typography, Divider, Button } from "@mui/material";
import PersonalDetails from "../components/Profile/PersonalDetails";
import MyOrders from "../components/Profile/MyOrders";
import ChangePassword from "../components/Profile/ChangePassword";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const res = await axios.post(
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
      alert("Profile photo updated!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image");
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (authLoading || cartLoading)
    return (
      <Typography sx={{ mt: 5, textAlign: "center" }}>Loading...</Typography>
    );

  if (authError)
    return (
      <Typography color="error" sx={{ mt: 5, textAlign: "center" }}>
        {authError?.message || authError || "Something went wrong"}
      </Typography>
    );

  if (!token || !user)
    return (
      <Typography sx={{ mt: 5, textAlign: "center" }}>
        Please log in to view your profile.
      </Typography>
    );

  return (
    <div className="container">
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 6, p: 3 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={4}>
          My Profile
        </Typography>

        <PersonalDetails user={user} onImageChange={handleImageChange} />
        <MyOrders />
        <ChangePassword />

        <Divider sx={{ my: 3 }} />

        <Box mb={4}>
          <Typography variant="h5" fontWeight={600} mb={2}>
            Cart Summary
          </Typography>

          {cartError && (
            <Typography color="error">
              Error loading cart: {cartError}
            </Typography>
          )}

          {cartItems && cartItems.length > 0 ? (
            <Box>
              <Typography>
                Total Items:{" "}
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </Typography>
              <Typography>
                Total Price: $
                {cartItems.reduce(
                  (sum, item) =>
                    sum + (item.product_details?.price || 0) * item.quantity,
                  0
                )}
              </Typography>
            </Box>
          ) : (
            <Typography>Your cart is empty.</Typography>
          )}
        </Box>

        <Box textAlign="center">
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
