import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, logout } from "../redux/authSlice";
import { fetchCart } from "../redux/cart/cartSlice";
import { Box, Typography, Divider, Button } from "@mui/material";
import PersonalDetails from "../Component/Profile/PersonalDetails";
import MyOrders from "../Component/Profile/MyOrders";
import ChangePassword from "../Component/Profile/ChangePassword";
import Navbar from "../Component/Navbar";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading: authLoading, error: authError } = useSelector((state) => state.auth);
  const { items: cartItems, loading: cartLoading, error: cartError } = useSelector((state) => state.cart);

  // Fetch user profile and cart
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) dispatch(fetchCart());
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  if (authLoading || cartLoading) return <Typography sx={{ mt: 5, textAlign: "center" }}>Loading...</Typography>;
  if (authError) return <Typography color="error" sx={{ mt: 5, textAlign: "center" }}>{authError}</Typography>;
  if (!user) return <Typography sx={{ mt: 5, textAlign: "center" }}>Please log in to view your profile.</Typography>;

  return (
    <div className="container">
      <Navbar />
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 6, p: 3 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={4}>My Profile</Typography>

        <PersonalDetails user={user} />
        <MyOrders />
        <ChangePassword />

        <Divider sx={{ my: 3 }} />

        <Box mb={4}>
          <Typography variant="h5" fontWeight={600} mb={2}>Cart Summary</Typography>
          {cartError && <Typography color="error">Error loading cart: {cartError}</Typography>}
          {cartItems && cartItems.length > 0 ? (
            <Box>
              <Typography>Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</Typography>
              <Typography>Total Price: ${cartItems.reduce((sum, item) => sum + (item.product_details?.price || 0) * item.quantity, 0)}</Typography>
            </Box>
          ) : (
            <Typography>Your cart is empty.</Typography>
          )}
        </Box>

        <Box textAlign="center">
          <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
