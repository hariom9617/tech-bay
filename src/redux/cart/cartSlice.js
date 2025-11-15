import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No token found");

      const res = await axios.get("http://192.168.29.133:5004/viewcart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Increase quantity / add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        "http://192.168.29.133:5004/addtocart",
        { product_id: productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { productId, quantity };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Decrease quantity / remove from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        "http://192.168.29.133:5004/removefromcart",
        { product_id: productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { productId, quantity };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        const item = state.items.find((i) => i.product_id === productId);
        if (item) {
          item.quantity += quantity;
        }
      })
      // Remove from Cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        const item = state.items.find((i) => i.product_id === productId);
        if (item) {
          if (item.quantity > quantity) {
            item.quantity -= quantity;
          } else {
            state.items = state.items.filter((i) => i.product_id !== productId);
          }
        }
      });
  },
});

export default cartSlice.reducer;
