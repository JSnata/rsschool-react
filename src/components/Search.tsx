import React, { useContext } from 'react';
import styles from './Search.module.css';
import useSearchQuery from '../customHooks/useSearchQuery';
import { ThemeContext } from '../pages/MainPage';

interface Props {
  searchHandler: (query: string) => void;
}

const SearchComponent = (props: Props) => {
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const { theme } = useContext(ThemeContext);

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
        className={`${styles.searchInput} ${styles[theme]}`}
      />
      <button
        onClick={handleSearch}
        className={`${styles.searchButton} ${styles[theme]}`}
      >
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
