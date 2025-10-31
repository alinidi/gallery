import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import type { RootState } from '../../store/store';
import s from './SingleCard.module.scss';

export const SingleCard = () => {
  const { id } = useParams();
  const { items } = useSelector((state: RootState) => state.products);
  const product = items.find((p) => p.id === Number(id));

  if (!product) return <p>Product not found</p>;

  return (
    <div className={s.singleCard}>
      <h1 className={s.singleCard__title}>{product.title}</h1>
      <p className={s.singleCard__text}>{product.description}</p>
      <div className={s.singleCard__info}>
        <p>Category: {product.category}</p>
        <p>Brand: {product.brand}</p>
        <p>Price: {product.price}</p>
      </div>
      <Link to="/products">Go back</Link>
    </div>
  );
};
