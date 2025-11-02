import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { ProductCard } from '../ProductCard/ProductCard';
import { useEffect, useState, type ChangeEvent } from 'react';
import {
  deleteProduct,
  editProduct,
  fetchProducts,
  toggleLike,
} from '../../store/productSlice';
import s from './ProductsList.module.scss';
import { Filter } from '../Filter/Filter';
import type { Product } from '../../types/product';
import { Form } from '../common/Form/Form';
import { BounceLoader } from 'react-spinners';
import { Search } from 'lucide-react';

export const ProductsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.products);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredItems = items.filter((item) => {
    if (filter === 'liked') {
      if (!item.liked) return false;
    } else if (filter !== 'all') {
      if (item.category?.toLowerCase() !== filter.toLowerCase()) return false;
    }

    if (searchTerm) {
      const matchTitle = item.title.toLowerCase().includes(searchTerm);
      const matchDesc = item.description.toLowerCase().includes(searchTerm);
      return matchTitle || matchDesc;
    }

    return true;
  });
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  if (status === 'pending') {
    return (
      <div className={s.spinner}>
        <BounceLoader color="white" />
      </div>
    );
  }

  function handleLike(id: number) {
    dispatch(toggleLike(id));
  }

  function deleteProductCard(id: number) {
    dispatch(deleteProduct(id));
  }

  function handleFilter(value: string) {
    setFilter(value);
    setCurrentPage(1);
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value.toLowerCase());
  }

  return (
    <div className={s.productsList}>
      <h1>Products List</h1>
      <div className={s.productsList__options}>
        <Filter handleFilter={handleFilter} />
        <div className={s.productsList__options__input}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search />
        </div>
      </div>
      <div className={s.productsList__list}>
        {currentItems.map((p) => (
          <div key={p.id}>
            <ProductCard
              id={p.id}
              title={p.title}
              description={p.description}
              liked={p.liked}
              handleLike={handleLike}
              deleteProductCard={deleteProductCard}
              onEdit={() => setEditingProduct(p)}
            />
          </div>
        ))}
      </div>
      {editingProduct && (
        <div className={s.modal}>
          <div className={s.modal__container}>
            <h2>Edit Product</h2>
            <Form
              defaultValues={editingProduct}
              onSubmit={(data) => {
                dispatch(
                  editProduct({
                    ...data,
                    id: editingProduct.id,
                    price: Number(data.price),
                  })
                );
                setEditingProduct(null);
              }}
              onCancel={() => setEditingProduct(null)}
            />
          </div>
        </div>
      )}
      {filteredItems.length > 0 && (
        <div style={{ margin: '1rem' }}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({
            length: Math.ceil(filteredItems.length / itemsPerPage),
          }).map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(items.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
