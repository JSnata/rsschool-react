import React, { useContext, useState, useEffect } from 'react';
import styles from './Search.module.css';
import useSearchQuery from '../../customHooks/useSearchQuery';
import { ThemeContext } from '../../context/ThemeContext';
import { People } from '../../types/types';

interface Props {
  searchHandler: (query: string) => void;
  setInitialItems: React.Dispatch<React.SetStateAction<People[]>>;
}

const SearchComponent = ({ searchHandler, setInitialItems }: Props) => {
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

    setInitialItems([]);
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
