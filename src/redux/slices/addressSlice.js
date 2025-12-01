import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "https://techbay-1ej5.onrender.com";
const extractError = (err) =>
  err?.response?.data?.error ||
  err?.response?.data?.message ||
  err?.message ||
  "Network Error";

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue("No token found");

      const res = await axios.get(`${API_BASE}/viewaddress`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Prioritize res.data.address (based on your JSON), then fallbacks
      return res.data.address || res.data.addresses || res.data || [];
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue("No token found");

      const res = await axios.post(`${API_BASE}/addaddress`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.address || res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      await axios.delete(`${API_BASE}/deleteaddress/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return addressId;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await axios.put(`${API_BASE}/updateaddress/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.address;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;

        // Ensure list is always an array of address objects
        if (Array.isArray(data)) {
          state.list = data;
        } else if (data && typeof data === 'object' && Array.isArray(data.address)) {
          // If data is { address: [...] }, extract the array
          state.list = data.address;
        } else if (data && typeof data === 'object') {
          // If data is a single address object, wrap in array
          state.list = [data];
        } else {
          state.list = [];
        }
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        if (!Array.isArray(state.list)) {
          state.list = [];
        }
        if (action.payload) {
          state.list.push(action.payload);
        }
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.list = state.list.filter((addr) => addr._id !== action.payload);
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.list.findIndex((a) => a._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      });
  },
});

export default addressSlice.reducer;