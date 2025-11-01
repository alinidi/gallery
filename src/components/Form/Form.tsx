import { useForm } from 'react-hook-form';
import s from './Form.module.scss';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { addProduct } from '../../store/productSlice';
import type { Product } from '../../types/product';

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>();
  const dispatch = useDispatch<AppDispatch>();

  function submitForm(data: Product) {
    dispatch(
      addProduct({
        ...data,
        id: Date.now(),
        liked: false,
        price: Number(data.price),
      })
    );
    reset();
  }

  return (
    <>
      <h1>Create Product</h1>
      <form className={s.form} onSubmit={handleSubmit(submitForm)}>
        <div className={s.form__field}>
          <label htmlFor="title">Name of the product</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: true, minLength: 1 })}
          />
        </div>
        {errors.title?.type === 'required' && (
          <p className={s.form__error}>
            The name must contain at least one letter
          </p>
        )}
        <div className={s.form__field}>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            {...register('description', { required: true, minLength: 1 })}
          />
        </div>
        {errors.description?.type === 'required' && (
          <p className={s.form__error}>
            The description must contain at least one letter
          </p>
        )}
        <div className={s.form__field}>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            {...register('category', { required: true, minLength: 1 })}
          />
        </div>
        {errors.category?.type === 'required' && (
          <p className={s.form__error}>
            The category must contain at least one letter
          </p>
        )}
        <div className={s.form__field}>
          <label htmlFor="brand">Brand</label>
          <input
            id="brand"
            type="text"
            {...register('brand', { required: true, minLength: 1 })}
          />
        </div>
        {errors.brand?.type === 'required' && (
          <p className={s.form__error}>Brand is required</p>
        )}
        <div className={s.form__field}>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            min={1}
            {...register('price', {
              required: 'Price is required',
              min: { value: 1, message: 'Price must be at least 1' },
            })}
          />
        </div>
        {errors.price && (
          <p className={s.form__error}>{errors.price.message}</p>
        )}
        <button>Create Product</button>
      </form>
    </>
  );
};
