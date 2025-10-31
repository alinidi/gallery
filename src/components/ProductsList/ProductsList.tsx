import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { ProductCard } from '../ProductCard/ProductCard';
import { useEffect } from 'react';
import {
  deleteProduct,
  fetchProducts,
  toggleLike,
} from '../../store/productSlice';
import s from './ProductsList.module.scss';

export const ProductsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    console.log('dispatching fetchProducts()');
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
    <div className={s.productsList}>
      <h1>Products List</h1>
      <div className={s.productsList__list}>
        {items.map((p) => (
          <div key={p.id}>
            <ProductCard
              id={p.id}
              title={p.title}
              description={p.description}
              liked={p.liked}
              handleLike={handleLike}
              deleteProductCard={deleteProductCard}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
