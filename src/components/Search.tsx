import React from 'react';
import styles from './Search.module.css';
import useSearchQuery from '../customHooks/useSearchQuery';

interface Props {
  searchHandler: (query: string) => void;
}

const SearchComponent = (props: Props) => {
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    props.searchHandler(trimmedQuery);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className={styles.searchInput}
      />
      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
