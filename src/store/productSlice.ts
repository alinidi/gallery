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
    addProduct(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
    },
    editProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
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

export const { toggleLike, deleteProduct, addProduct, editProduct } =
  productsSlice.actions;
export const productsReducer = productsSlice.reducer;
