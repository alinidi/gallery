import { type ChangeEvent } from 'react';
import s from './DropDown.module.scss';

type DropDownType = {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedValue: string;
};

export const DropDown = ({ handleChange, selectedValue }: DropDownType) => {
  return (
    <select
      value={selectedValue}
      onChange={handleChange}
      className={s.dropDown}
    >
      <option value="" disabled>
        Category
      </option>
      <option value="beauty">Beauty</option>
      <option value="fragrances">Fragrances</option>
      <option value="furniture">Furniture</option>
      <option value="groceries">Groceries</option>
    </select>
  );
};
