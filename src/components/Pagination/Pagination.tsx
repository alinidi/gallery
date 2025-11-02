import type { PaginationType } from '../../types/types';
import s from './Pagination.module.scss';

export const Pagination = ({
  setCurrentPage,
  items,
  currentPage,
  filteredItems,
  itemsPerPage,
}: PaginationType) => {
  return (
    <div className={s.pagination}>
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
  );
};
