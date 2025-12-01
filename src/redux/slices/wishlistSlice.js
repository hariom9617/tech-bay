// src/redux/slices/wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "https://techbay-1ej5.onrender.com";

const extractError = (err) =>
  err?.response?.data?.error || err?.response?.data?.message || err?.message || "Network Error";

/**
 * All thunks read token from thunkAPI.getState().auth.token
 */

/** Fetch wishlist */
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue("No token found");
      const res = await axios.get(`${API_BASE}/viewwishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // normalize: server might return { wishlist: [...] } or [...]
      return res.data.wishlist ?? res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  }
);

/** Add to wishlist */
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ productId }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue("No token found");
      const res = await axios.post(
        `${API_BASE}/addtowishlist/${String(productId)}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // server likely returns the added item or full wishlist
      if (res.data?.wishlist) return res.data.wishlist;
      if (res.data?.wishlistItem) return { wishlistItem: res.data.wishlistItem };
      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  }
);

/** Remove from wishlist */
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ productId }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue("No token found");
      const res = await axios.delete(`${API_BASE}/removefromwishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // server may return updated wishlist or success flag
      if (res.data?.wishlist) return res.data.wishlist;
      return productId;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload;
      state.lastUpdated = Date.now();
    },
    clearWishlist: (state) => {
      state.items = [];
      state.lastUpdated = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload ?? [];
        state.lastUpdated = Date.now();
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed fetching wishlist";
      })

      // add
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        if (Array.isArray(payload)) {
          state.items = payload;
        } else if (payload?.wishlistItem) {
          state.items.push(payload.wishlistItem);
        } else if (payload?.product_id || payload?.productId) {
          // if server returned the item directly
          state.items.push(payload);
        }
        state.lastUpdated = Date.now();
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed adding to wishlist";
      })

      // remove
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        if (Array.isArray(payload)) {
          state.items = payload;
        } else {
          // payload is productId
          state.items = state.items.filter((i) => i.product_id !== payload && i.productId !== payload);
        }
        state.lastUpdated = Date.now();
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed removing from wishlist";
      });
  },
});

export const { setWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
