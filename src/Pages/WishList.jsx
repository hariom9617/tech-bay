import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice";
import { Typography, Button, Card, CardContent, Box, Divider } from "@mui/material";

const Wishlist = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const { items, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (token) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, token]);

  if (!token)
    return <Typography sx={{ mt: 4, textAlign: "center" }}>Please log in to view your wishlist.</Typography>;

  if (loading)
    return <Typography sx={{ mt: 4, textAlign: "center" }}>Loading...</Typography>;

  if (error)
    return (
      <Typography sx={{ mt: 4, textAlign: "center" }} color="error">
        {error}
      </Typography>
    );

  if (!items.length)
    return <Typography sx={{ mt: 4, textAlign: "center" }}>Your wishlist is empty.</Typography>;

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}>
        My Wishlist ({items.length})
      </Typography>

      {items.map((item) => (
        <Card
          key={item.product_id}
          sx={{
            display: "flex",
            mb: 3,
            alignItems: "center",
            p: 2,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >

          <Box sx={{ minWidth: 120, maxWidth: 120, mr: 3 }}>
            <img
              src={item.product_details?.image}
              alt={item.product_details?.title}
              style={{
                width: "100%",
                borderRadius: "10px",
                objectFit: "contain",
              }}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {item.product_details?.title}
            </Typography>

            <Typography sx={{ mt: 1, mb: 2 }}>
              ₹ {item.product_details?.price}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {item.product_details?.description || "No description available."}
            </Typography>
          </Box>

          <Box sx={{ ml: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => dispatch(removeFromWishlist({ productId: item.product_id }))}
            >
              Remove
            </Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default Wishlist;
