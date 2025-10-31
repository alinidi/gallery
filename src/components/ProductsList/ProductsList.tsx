import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { ProductCard } from '../ProductCard/ProductCard';
import { useEffect } from 'react';
import {
  deleteProduct,
  fetchProducts,
  toggleLike,
} from '../../store/productSlice';

export const ProductsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'pending') console.log('Pending');
  if (status === 'failed') console.log('Failed');

  function handleLike(id: number) {
    dispatch(toggleLike(id));
  }

  function deleteProductCard(id: number) {
    dispatch(deleteProduct(id));
  }

  return (
    <div>
      <h1>Products List</h1>
      <div>
        {items.map((p) => (
          <div key={p.id}>
            <ProductCard
              title={p.title}
              description={p.description}
              handleLike={handleLike}
              deleteProductCard={deleteProductCard}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
