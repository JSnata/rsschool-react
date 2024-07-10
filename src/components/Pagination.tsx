import React from 'react';
import styles from './Pagination.module.css';

interface Props {
  totalItemsCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalItemsCount, currentPage, onPageChange }: Props) => {
  const totalPages = Math.ceil(totalItemsCount / 10);

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            className={`${styles.page} ${currentPage === page ? styles.active : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
