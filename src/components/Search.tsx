import React, { useState, useEffect } from 'react';
import styles from './Search.module.css';

interface Props {
  searchHandler: (query: string) => void;
}

const SearchComponent = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('searchQuery') || '';
    setSearchQuery(savedSearchQuery);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    localStorage.setItem('searchQuery', trimmedQuery);
    props.searchHandler(trimmedQuery);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        className={styles.searchInput}
      />
      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
