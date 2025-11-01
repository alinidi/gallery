export type Product = {
  id: number;
  title: string;
  description: string;
  liked?: boolean;
  category?: string;
  price?: number;
  brand?: string;
};

export type ProductsState = {
  items: Product[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
};

export type ProductCardType = {
  id: number;
  title: string;
  description: string;
  liked?: boolean;
  category?: string;
  brand?: string;
  price?: number;
  handleLike: (id: number) => void;
  deleteProductCard: (id: number) => void;
};

export type FilterType = {
  handleFilter: (filter: string) => void;
};
