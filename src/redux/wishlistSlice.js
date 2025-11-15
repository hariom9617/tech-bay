// src/redux/wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch wishlist items for logged-in user
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://your-api.com/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // array of wishlist items
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching wishlist");
    }
  }
);

// Add an item to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ token, product }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://your-api.com/wishlist",
        { productId: product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data; // newly added item
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding to wishlist");
    }
  }
);

// Remove an item from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ token, productId }, { rejectWithValue }) => {
    try {
      await axios.delete(`http://your-api.com/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error removing from wishlist");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.product_id !== action.payload);
      });
  },
});

export default wishlistSlice.reducer;
