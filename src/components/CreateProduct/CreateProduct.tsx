import { Link } from 'react-router-dom';
import { Form } from '../common/Form/Form';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/productSlice';
import type { AppDispatch } from '../../store/store';

export default function CreateProduct() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h1>Create Product</h1>
      <Form
        onSubmit={(data) => {
          dispatch(
            addProduct({
              ...data,
              id: Date.now(),
              liked: false,
              price: Number(data.price),
            })
          );
        }}
      />
      <Link to="/products">Go back</Link>
    </div>
  );
}
