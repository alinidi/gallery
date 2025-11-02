import { useForm } from 'react-hook-form';
import type { FC } from 'react';
import type { FormType, Product } from '../../../types/types';
import s from './Form.module.scss';

export const Form: FC<FormType> = ({ defaultValues, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>({ defaultValues });

  const submit = (data: Product) => {
    onSubmit(data);
    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(submit)}>
      <div className={s.form__field}>
        <label htmlFor="title">Name</label>
        <input
          id="title"
          type="text"
          {...register('title', { required: true })}
        />
      </div>
      {errors.title && <p className={s.form__error}>Name is required</p>}

      <div className={s.form__field}>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          {...register('description', { required: true })}
        />
      </div>
      {errors.description && (
        <p className={s.form__error}>Description is required</p>
      )}

      <div className={s.form__field}>
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          {...register('category', { required: true })}
        />
      </div>
      {errors.category && <p className={s.form__error}>Category is required</p>}

      <div className={s.form__field}>
        <label htmlFor="brand">Brand</label>
        <input
          id="brand"
          type="text"
          {...register('brand', { required: true })}
        />
      </div>
      {errors.brand && <p className={s.form__error}>Brand is required</p>}

      <div className={s.form__field}>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          step={0.01}
          min={1}
          {...register('price', {
            required: true,
            min: { value: 1, message: 'Price must be at least 1' },
            valueAsNumber: true,
          })}
        />
      </div>
      {errors.price && (
        <p className={s.form__error}>Price must be more than 1</p>
      )}

      <button type="submit">Save</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};
