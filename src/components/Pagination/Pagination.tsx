import React, { useContext } from 'react';
import styles from './Pagination.module.css';
import { useRouter } from 'next/router';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
  totalItemsCount: number;
  currentPage: number;
}

const Pagination = ({ totalItemsCount, currentPage }: Props) => {
  const totalPages = Math.ceil(totalItemsCount / 10);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push({
      pathname: '/',
      query: { page: page.toString() },
    });
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`${styles.pagination} ${styles[theme]}`}>
      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <button
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
