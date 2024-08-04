import React, { useContext, useState, useEffect } from 'react';
import styles from './Search.module.css';
import useSearchQuery from '../../customHooks/useSearchQuery';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
  searchHandler: (query: string) => void;
}

const SearchComponent = ({ searchHandler }: Props) => {
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const [value, setValue] = useState(searchQuery || '');
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const trimmedQuery = value.trim();
    searchHandler(trimmedQuery);
    setSearchQuery(trimmedQuery || ' ');
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = value.trim();
    searchHandler(trimmedQuery);
    setSearchQuery(trimmedQuery || ' ');
  };

  return (
    <form
      className={`${styles.container} ${styles[theme]}`}
      onSubmit={handleSearch}
    >
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className={`${styles.searchInput} ${styles[theme]}`}
      />
      <button
        type="submit"
        className={`${styles.searchButton} ${styles[theme]}`}
      >
        Search
      </button>
    </form>
  );
};

export default SearchComponent;
