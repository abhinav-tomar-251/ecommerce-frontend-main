 import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BackendApi from '@/app/common';

interface Product {
  _id: string;
  quantity: number;
  productId: {
    productName: string;
    productImage: string[];
    category: string;
    sellingPrice: number;
  };
}

interface CartState {
  data: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axios.get(BackendApi.addToCartProductView.url, {
    method: BackendApi.addToCartProductView.method,
    withCredentials: true,
  });
  return response.data.data;
});

export const updateCart = createAsyncThunk('cart/updateCart', async ({ id, quantity }: { id: string, quantity: number }) => {
  await axios.post(BackendApi.updateCartProduct.url, { _id: id, quantity }, {
    withCredentials: true,
  });
  return { id, quantity };
});

export const deleteCartProduct = createAsyncThunk('cart/deleteCartProduct', async (id: string) => {
  await axios.post(BackendApi.deleteCartProduct.url, { _id: id }, {
    withCredentials: true,
  });
  return id;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cart';
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        const { id, quantity } = action.payload;
        const product = state.data.find((item) => item._id === id);
        if (product) {
          product.quantity = quantity;
        }
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
      });
  },
});

export default cartSlice.reducer;