// src/services/cartService.js
import axios from "axios";

const API_BASE = "http://192.168.29.133:5004"; // replace with your backend URL

const cartService = {
  // Fetch cart for a user
  getCart: async (userId) => {
    const res = await axios.get(`${API_BASE}/viewcart?userId=${userId}`);
    console.log("Cart API response:", res.data);
    return res;
  },

  // Add item to cart
  addToCart: async (userId, productId, quantity = 1) => {
    const res = await axios.post(`${API_BASE}/addtocart`, {
      userId,
      productId,
      quantity,
    });
    return res;
  },

  // Update cart item quantity
  updateCart: async (userId, cartItemId, quantity) => {
    const res = await axios.put(`${API_BASE}/updatecart`, {
      userId,
      cartItemId,
      quantity,
    });
    return res;
  },

  // Delete cart item
  deleteFromCart: async (userId, cartItemId) => {
    const res = await axios.delete(
      `${API_BASE}/deletefromcart?userId=${userId}&cartItemId=${cartItemId}`
    );
    return res;
  },
};

export default cartService;
