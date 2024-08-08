import React, { useContext } from 'react';
import styles from './Pagination.module.css';
import { useRouter } from 'next/router';
import { ThemeContext } from '../../context/ThemeContext';
import { useCombinedContext } from '../../context/ItemsContext';

interface Props {
  totalItemsCount: number;
  currentPage: number;
}

const Pagination = ({ totalItemsCount, currentPage }: Props) => {
  const totalPages = Math.ceil(totalItemsCount / 10);
  const { theme } = useContext(ThemeContext);
  const { hideDetails, detailsOpened } = useCombinedContext();
  const router = useRouter();
  const { search } = router.query;

  const handlePageChange = (page: number) => {
    const queryParams: { page: string; search?: string } = {
      page: page.toString(),
    };
    if (search && search != ' ') {
      queryParams.search = search as string;
    }
    router.push({
      pathname: '/',
      query: queryParams,
    });
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
