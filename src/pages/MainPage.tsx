import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResultsList from '../components/ResultsList';
import { People } from '../types/types';
import Search from '../components/Search';
import styles from './MainPage.module.css';
import ErrorButton from '../components/ErrorButton';
import Pagination from '../components/Pagination';

const MainPage = () => {
  const [results, setResults] = useState<People[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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
    const searchQuery = localStorage.getItem('searchQuery') || '';
    fetchData(currentPage, searchQuery);
  }, [currentPage]);

  const searchHandler = (query: string) => {
    setCurrentPage(1);
    fetchData(1, query);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (hasError) {
    return <h1 className={styles.error}>Something went wrong.</h1>;
  }

  return (
    <div className={styles.container}>
      <Search searchHandler={searchHandler} />
      {loading && <h2>Loading....</h2>}
      {!loading && !results.length && <p>No results found.</p>}
      {!loading && results.length && <ResultsList results={results} />}
      {!loading && results.length && (
        <Pagination
          totalItemsCount={count}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      <ErrorButton />
    </div>
  );
};

export default MainPage;
