import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_BASE = "https://techbay-1ej5.onrender.com";
//  Fetch Orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // get token from redux
      const res = await axios.get(
        `${API_BASE}/vieworders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);


// Cancel Order
export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
       const id = String(orderId);
      const res = await axios.put(`${API_BASE}/cancelorder/${orderId}`);
      return res.data; // return updated order
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//  Confirm Order
export const confirmOrder = createAsyncThunk(
  "orders/confirmOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_BASE}/confirmorder/${orderId}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);


const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
      state.orders = action.payload.orders || [];
        state.error = null; 
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cancel Order
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((o) =>
          o._id === action.payload._id ? action.payload : o
        );
      })

      // Confirm Order
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((o) =>
          o._id === action.payload._id ? action.payload : o
        );
      });
  },
});

export default orderSlice.reducer;
