
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "https://techbay-1ej5.onrender.com";

const extractError = (err) =>
  err?.response?.data?.error || err?.response?.data?.message || err?.message || "Network Error";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue("No token found");
      const res = await axios.get(`${API_BASE}/viewcart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.cart ?? res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue("No token found");
      const res = await axios.post(
        `${API_BASE}/addtocart`,
        { product_id: productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.cart) return res.data.cart;
      return { productId, quantity, updatedItem: res.data };
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, quantity = 1 }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue("No token found");
      const res = await axios.post(
        `${API_BASE}/reducefromcart`,
        { product_id: productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.cart) return res.data.cart;
      return { productId, quantity, removedResult: res.data };
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  }
);

export const clearCartLocal = createAsyncThunk("cart/clearLocal", async () => {
  return [];
});

const initialState = {
  items: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

const normalizeId = (item) =>
  item?.product_id ?? item?.productId ?? item?._id ?? item?.id ?? null;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
      state.lastUpdated = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload ?? [];
        state.lastUpdated = Date.now();
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed fetching cart";
      })

      .addCase(addToCart.pending, (state) => {
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;

        if (Array.isArray(payload)) {
          state.items = payload;
        } else {
          const { productId, quantity, updatedItem } = payload || {};

          if (updatedItem && typeof updatedItem === "object") {
           
            const updatedId = normalizeId(updatedItem) || productId;
            
            const idx = state.items.findIndex((it) => normalizeId(it) === updatedId);
            const serverQty =
              updatedItem.quantity ?? updatedItem.qty ?? updatedItem.qty_amount ?? null;

            if (idx !== -1) {
              if (serverQty !== null && !Number.isNaN(Number(serverQty))) {
                state.items[idx].quantity = Number(serverQty);
              } else {
                state.items[idx].quantity = (state.items[idx].quantity || 0) + (quantity || 1);
              }
              
              state.items[idx] = { ...state.items[idx], ...updatedItem };
            } else {
              const newItem = {
                product_id: updatedId,
                quantity:
                  serverQty !== null && !Number.isNaN(Number(serverQty))
                    ? Number(serverQty)
                    : quantity || 1,
                
                ...updatedItem,
              };
              state.items.push(newItem);
            }
          } else if (productId) {
            const idx = state.items.findIndex((it) => normalizeId(it) === productId);
            if (idx !== -1) {
              state.items[idx].quantity = (state.items[idx].quantity || 0) + (quantity || 1);
            } else {
              state.items.push({ product_id: productId, quantity: quantity || 1 });
            }
          }
        }

        state.lastUpdated = Date.now();
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed adding to cart";
      })
 
      .addCase(removeFromCart.pending, (state) => {
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;

        
        if (Array.isArray(payload)) {
          state.items = payload;
        } else {
          const { productId, quantity, removedResult } = payload || {};
         
          const removedId =
            normalizeId(removedResult) ||
            normalizeId(removedResult?.item) ||
            productId;

          if (removedId) {
            const idx = state.items.findIndex((it) => normalizeId(it) === removedId);
            if (idx !== -1) {
              const currentQty = state.items[idx].quantity || 0;
              const reduceBy = quantity || 1;

              if (currentQty > reduceBy) {
                state.items[idx].quantity = currentQty - reduceBy;
              } else {
                state.items.splice(idx, 1);
              }
            }
          }
        }

        state.lastUpdated = Date.now();
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed removing from cart";
      })

      .addCase(clearCartLocal.fulfilled, (state) => {
        state.items = [];
        state.lastUpdated = Date.now();
      });
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
