import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { ProductCard } from '../ProductCard/ProductCard';
import { useEffect, useState } from 'react';
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

export const ProductsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.products);
  const [filter, setFilter] = useState<'all' | 'liked'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredItems =
    filter === 'liked' ? items.filter((i) => i.liked) : items;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  function handleLike(id: number) {
    dispatch(toggleLike(id));
  }

  function deleteProductCard(id: number) {
    dispatch(deleteProduct(id));
  }

  function handleFilter(filter: string) {
    if (filter === 'all') setFilter('all');
    if (filter === 'liked') setFilter('liked');
    setCurrentPage(1);
  }

  const likedCards = items.filter((item) => item.liked);

  return (
    <div className={s.productsList}>
      <h1>Products List</h1>
      <Filter handleFilter={handleFilter} />
      <div className={s.productsList__list}>
        {filter === 'all'
          ? currentItems.map((p) => (
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
            ))
          : likedCards.map((p) => (
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
        <div>
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
