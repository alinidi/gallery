import { useDispatch } from 'react-redux';
import { Form } from '../components/common/Form/Form';
import type { AppDispatch } from '../store/store';
import { addProduct } from '../store/productSlice';
import { Link } from 'react-router-dom';

export default function CreateProductPage() {
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
