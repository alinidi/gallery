export type Product = {
  id: number;
  title: string;
  description: string;
  liked?: boolean;
};

export type ProductsState = {
  items: Product[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
};

export type ProductCardType = {
  title: string;
  description: string;
  handleLike: (id: number) => void;
  deleteProductCard: (id: number) => void;
};
