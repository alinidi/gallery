import type { FilterType } from '../../types/product';
import s from './Filter.module.scss';

export const Filter = ({ handleFilter }: FilterType) => {
  return (
    <div className={s.filter}>
      <button onClick={() => handleFilter('all')}>All</button>
      <button onClick={() => handleFilter('liked')}>Favorite</button>
    </div>
  );
};
