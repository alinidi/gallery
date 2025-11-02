import { Heart, Pen, TrashIcon } from 'lucide-react';
import type { ProductCardType } from '../../types/product';
import s from './ProductCard.module.scss';
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({
  id,
  title,
  description,
  liked,
  handleLike,
  deleteProductCard,
  onEdit,
}: ProductCardType) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('svg')) return;
    navigate(`/products/${id}`);
  };

  return (
    <div className={s.productCard} onClick={handleClick}>
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
        <Pen className={s.productCard__buttons__icon} onClick={onEdit} />
      </div>
    </div>
  );
};
