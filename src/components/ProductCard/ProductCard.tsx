import { Heart, TrashIcon } from 'lucide-react';
import type { ProductCardType } from '../../types/product';
import s from './ProductCard.module.scss';

export const ProductCard = ({
  id,
  title,
  description,
  liked,
  handleLike,
  deleteProductCard,
}: ProductCardType) => {
  return (
    <div className={s.productCard}>
      <h2 className={s.productCard__title}>{title}</h2>
      <p className={s.productCard__text}>{description}</p>
      <div className={s.productCard__buttons}>
        <Heart
          className={s.productCard__buttons__icon}
          color={liked ? 'pink' : 'black'}
          onClick={() => handleLike(id)}
        />
        <TrashIcon
          className={s.productCard__buttons__icon}
          onClick={() => deleteProductCard(id)}
        />
      </div>
    </div>
  );
};
