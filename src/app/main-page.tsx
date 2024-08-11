'use client';

import React, { useContext, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import ResultsList from '../components/ResultsList/ResultsList';
import Search from '../components/Search/Search';
import styles from '../styles/styles.module.css';
import Pagination from '../components/Pagination/Pagination';
import ToggleTheme from '../components/ToggleTheme/ToggleTheme';
import Flyout from '../components/Flyout/Flyout';
import { People } from '../types/types';
import {
  ItemsContext,
  ItemsContextType,
  useCombinedContext,
} from '../context/ItemsContext';
import { ThemeContext } from '../context/ThemeContext';

const ItemDetails = dynamic(
  () => import('../components/ItemDetails/ItemDetails'),
);

interface MainPageProps {
  initialItems: People[];
  initialCount: number;
  itemDetails?: People | null;
}

const MainPage = ({
  initialItems: initialItemsProp,
  initialCount,
  itemDetails: itemDetailsProp,
}: MainPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const page = searchParams.get('page') || '1';
  const id = searchParams.get('id');
  const { hideDetails, detailsOpened } = useCombinedContext();
  const { theme } = useContext(ThemeContext);
  const { selectedItems, error } = useContext(ItemsContext) as ItemsContextType;
  const [loading, setLoading] = useState(false);
  const [initialItems, setInitialItems] = useState(initialItemsProp);
  const [itemDetails, setItemDetails] = useState(itemDetailsProp);

  useEffect(() => {
    setInitialItems(initialItemsProp);
    setLoading(false);
  }, [initialItemsProp]);

  useEffect(() => {
    setItemDetails(itemDetailsProp);
  }, [itemDetailsProp]);

  const searchHandler = (search: string) => {
    const queryParams = new URLSearchParams({ page: '1' });
    if (search && search.trim() !== '') {
      queryParams.set('search', search);
    }
    setLoading(true);
    router.push(`/?${queryParams.toString()}`);
  };

  const handleCloseDetails = (
    event: React.MouseEvent | React.KeyboardEvent,
  ) => {
    const queryParams = new URLSearchParams({ page });
    console.log(page);

    if (
      (event.target as HTMLElement).tagName === 'H3' ||
      (event.target as HTMLElement).id === 'person-button' ||
      (event.target as HTMLElement).id === 'pagination-btn' ||
      (event.target as HTMLElement).closest('#person-button')
    ) {
      return false;
    }
    if (search && search.trim() !== '') {
      queryParams.set('search', search);
    }
    setItemDetails(null);
    router.push(`/?${queryParams.toString()}`);
    hideDetails();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCloseDetails(event);
    }
  };

  console.log(loading);

  return (
    <div className={`${styles.container} mainPage ${styles[theme]}`}>
      <div
        className={styles.searchWrapper}
        onClick={(e) => (id ? handleCloseDetails(e) : undefined)}
        onKeyDown={id ? handleKeyDown : undefined}
        role="button"
        tabIndex={0}
      >
        <ToggleTheme />
        <h3 className={`${styles.heading} ${styles[theme]}`}>
          Find your favourite character!
        </h3>
        <Search
          searchHandler={searchHandler}
          setInitialItems={setInitialItems}
        />
        {loading && !detailsOpened && !initialItems.length && (
          <h2>Loading....</h2>
        )}
        {error && <p>{error}</p>}
        {!loading && (!initialItems || initialItems.length === 0) && (
          <p>No results found.</p>
        )}
        {(!loading && initialItems.length) ||
        (loading && initialItems.length) ? (
          <>
            <ResultsList results={initialItems} />
            <Pagination
              totalItemsCount={initialCount || 0}
              currentPage={Number(page) || 1}
            />
          </>
        ) : null}
      </div>
      {detailsOpened ? (
        <div className={styles.detailsWrapper}>
          <ItemDetails
            data={itemDetails}
            handleClose={handleCloseDetails}
            isLoading={loading}
          />
        </div>
      ) : null}
      {selectedItems.length ? <Flyout items={initialItems} /> : null}
    </div>
  );
};

export default MainPage;
