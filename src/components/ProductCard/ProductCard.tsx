import { Heart, HeartOff } from 'lucide-react';
import type { ProductCardType } from '../../types/product';

export const ProductCard = ({ title, description }: ProductCardType) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div>
        <Heart />
        <HeartOff />
      </div>
    </div>
  );
};
