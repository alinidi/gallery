import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { getProducts } from '../api/getProducts';
import type { Product, ProductsState } from '../types/product';

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const products = await getProducts();
    return products.map((product: Product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      liked: false,
      category: product.category,
      price: product.price,
      brand: product.brand,
    }));
  }
);

const initialState: ProductsState = {
  items: [],
  status: 'idle',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<number>) {
      const product = state.items.find((p) => p.id === action.payload);
      if (product) product.liked = !product.liked;
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { toggleLike, deleteProduct } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
