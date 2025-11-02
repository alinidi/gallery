import { useState, type ChangeEvent } from 'react';
import type { FilterType } from '../../types/types';
import { DropDown } from '../DropDown/DropDown';
import s from './Filter.module.scss';

export const Filter = ({ handleFilter }: FilterType) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.toLowerCase();
    setSelectedValue(value);
    handleFilter(value);
  };

  return (
    <div className={s.filter}>
      <button onClick={() => handleFilter('all')}>All</button>
      <button onClick={() => handleFilter('liked')}>Favorite</button>
      <DropDown handleChange={handleChange} selectedValue={selectedValue} />
    </div>
  );
};
