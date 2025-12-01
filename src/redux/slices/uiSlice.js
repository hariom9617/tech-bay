// src/redux/slices/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sidebarOpen: false,
    modal: {
      open: false,
      content: null,
    },
    toast: {
      message: "",
      type: "", // "success" | "error"
      open: false,
    },
    globalLoading: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },

    // Modal control
    openModal: (state, action) => {
      state.modal.open = true;
      state.modal.content = action.payload;
    },
    closeModal: (state) => {
      state.modal.open = false;
      state.modal.content = null;
    },

    // Toast controller
    showToast: (state, action) => {
      state.toast = {
        message: action.payload.message,
        type: action.payload.type || "success",
        open: true,
      };
    },
    hideToast: (state) => {
      state.toast.open = false;
      state.toast.message = "";
      state.toast.type = "";
    },

    // global loader (optional)
    startLoading: (state) => {
      state.globalLoading = true;
    },
    stopLoading: (state) => {
      state.globalLoading = false;
    },
  },
});

export const {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  openModal,
  closeModal,
  showToast,
  hideToast,
  startLoading,
  stopLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
