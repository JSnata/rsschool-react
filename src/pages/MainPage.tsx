import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import ResultsList from '../components/ResultsList';
import { People } from '../types/types';
import Search from '../components/Search';
import styles from './MainPage.module.css';
import Pagination from '../components/Pagination';
import useSearchQuery from '../customHooks/useSearchQuery';

interface MainPageProps {
  detailsOpened: boolean;
  hideDetails: () => void;
  showDetails: () => void;
}

const MainPage = ({
  detailsOpened,
  hideDetails,
  showDetails,
}: MainPageProps) => {
  const [results, setResults] = useState<People[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const fetchData = (page: number = 1, query: string = '') => {
    setLoading(true);
    const url = query
      ? `https://swapi.dev/api/people/?page=${page}&search=${query}`
      : `https://swapi.dev/api/people/?page=${page}`;

    axios
      .get(url)
      .then((response) => {
        const results = response.data.results as People[];
        setResults(results);
        setCount(response.data.count);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setHasError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
    fetchData(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const searchHandler = (query: string) => {
    setSearchQuery(query);
    setSearchParams({ page: '1' });
    fetchData(1, query);
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const handleItemClick = (id: string) => {
    navigate(`details/${id}?page=${currentPage}`);
    showDetails();
  };

  const handleClose = () => {
    navigate(`/?page=${currentPage}`);
    hideDetails();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClose();
    }
  };

  if (hasError) {
    return <h1 className={styles.error}>Something went wrong.</h1>;
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.searchWrapper}
        onClick={detailsOpened ? handleClose : undefined}
        onKeyDown={detailsOpened ? handleKeyDown : undefined}
        role="button"
        tabIndex={0}
      >
        <Search searchHandler={searchHandler} />
        {loading && <h2>Loading....</h2>}
        {!loading && !results.length && <p>No results found.</p>}
        {!loading && results.length && (
          <ResultsList results={results} onItemClick={handleItemClick} />
        )}
        {!loading && results.length && (
          <Pagination
            totalItemsCount={count}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      {detailsOpened && (
        <div className={styles.detailsWrapper}>
          <Outlet />
        </div>
      )}
    </div>
  );
};
export default MainPage;
