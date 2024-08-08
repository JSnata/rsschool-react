'use client';
import React, { useContext } from 'react';
import styles from './Pagination.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeContext } from '../../context/ThemeContext';
import { useCombinedContext } from '../../context/ItemsContext';

interface Props {
  totalItemsCount: number;
  currentPage: number;
}

const Pagination = ({ totalItemsCount, currentPage }: Props) => {
  const { hideDetails, detailsOpened } = useCombinedContext();
  const totalPages = Math.ceil(totalItemsCount / 10);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  const handlePageChange = (page: number) => {
    const queryParams = new URLSearchParams({ page: page.toString() });
    if (search) {
      queryParams.set('search', search);
    }

    router.push(`/?${queryParams.toString()}`);
    if (detailsOpened) {
      hideDetails();
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`${styles.pagination} ${styles[theme]}`}>
      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <button
            id="pagination-btn"
            key={page}
            className={`${styles.page} ${currentPage === page ? styles.active : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
