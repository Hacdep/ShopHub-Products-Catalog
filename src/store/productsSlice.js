import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products?limit=200"
      );
      return response.data.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load products"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load product"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedProduct: null,
    loading: false,
    detailLoading: false,
    error: null,
    detailError: null,
    sortBy: "stock-desc",
    currentPage: 1,
    itemsPerPage: 13,
  },
  reducers: {
    setSortBy(state, action) {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchProductById.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload;
      });
  },
});

export const { setSortBy, setPage, clearSelectedProduct } =
  productsSlice.actions;

export const selectSortBy = (state) => state.products.sortBy;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectItemsPerPage = (state) => state.products.itemsPerPage;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectDetailLoading = (state) => state.products.detailLoading;
export const selectDetailError = (state) => state.products.detailError;

export const selectSortedProducts = (state) => {
  const items = [...state.products.items];
  const sortBy = state.products.sortBy;
  if (sortBy === "name") {
    items.sort((a, b) => {
      const aNum = /^\d/.test(a.title);
      const bNum = /^\d/.test(b.title);
      if (aNum && !bNum) return -1;
      if (!aNum && bNum) return 1;
      return a.title.localeCompare(b.title, undefined, { numeric: true });
    });
  } else if (sortBy === "price") {
    items.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    items.sort((a, b) => b.price - a.price);
  } else if (sortBy === "discount") {
    items.sort((a, b) => a.discountPercentage - b.discountPercentage);
  } else if (sortBy === "discount-desc") {
    items.sort((a, b) => b.discountPercentage - a.discountPercentage);
  } else if (sortBy === "stock-desc") {
    items.sort((a, b) => b.stock - a.stock);
  }
  return items;
};

export default productsSlice.reducer;
