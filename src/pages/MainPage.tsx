import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResultsList from '../components/ResultsList';
import { People } from '../types/types';
import Search from '../components/Search';
import styles from './MainPage.module.css';
import ErrorButton from '../components/ErrorButton';

const MainPage = () => {
  const [results, setResults] = useState<People[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchData = (query: string) => {
    setLoading(true);
    const url = query
      ? `https://swapi.dev/api/people/?page=1&search=${query}`
      : 'https://swapi.dev/api/people/?page=1';

    axios
      .get(url)
      .then((response) => {
        const results = response.data.results as People[];
        setResults(results);
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
    fetchData(searchQuery);
  }, []);

  const searchHandler = (query: string) => {
    fetchData(query);
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
      <ErrorButton />
    </div>
  );
};

export default MainPage;
