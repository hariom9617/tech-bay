import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    priceRange: [0, 50000],
    selectedCategories: [],
    selectedBrands: [],
    minRating: 0,
    inStockOnly: false,
  },
  reducers: {
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
    toggleCategory(state, action) {
      const cat = action.payload;
      state.selectedCategories = state.selectedCategories.includes(cat)
        ? state.selectedCategories.filter((c) => c !== cat)
        : [...state.selectedCategories, cat];
    },
    toggleBrand(state, action) {
      const brand = action.payload;
      state.selectedBrands = state.selectedBrands.includes(brand)
        ? state.selectedBrands.filter((b) => b !== brand)
        : [...state.selectedBrands, brand];
    },
    setMinRating(state, action) {
      state.minRating = action.payload;
    },
    setInStock(state, action) {
      state.inStockOnly = action.payload;
    },
    clearFilters(state) {
      state.priceRange = [0, 50000];
      state.selectedCategories = [];
      state.selectedBrands = [];
      state.minRating = 0;
      state.inStockOnly = false;
    },
    resetFilters: (state) => {
      state.selectedCategories = [];
      state.selectedBrands = [];
      state.priceRange = [0, 50000];
      state.minRating = 0;
      state.inStockOnly = false;
    },
  },
});

export const { setPriceRange,toggleCategory, toggleBrand, setMinRating, setInStock, clearFilters, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
