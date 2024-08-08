import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
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
import ItemDetails from '../components/ItemDetails/ItemDetails';

interface MainPageProps {
  initialItems: People[];
  initialCount: number;
  itemDetails?: People | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page = '1', id, search = '' } = context.query;
  let itemDetails = null;
  let initialData;

  if (!search) {
    const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    initialData = await res.json();
  }

  if (id) {
    const itemRes = await fetch(`https://swapi.dev/api/people/${id}/`);
    itemDetails = await itemRes.json();
  }

  if (search) {
    const searchRes = await fetch(
      `https://swapi.dev/api/people/?search=${search}`,
    );
    initialData = await searchRes.json();
  }

  return {
    props: {
      initialItems: initialData.results,
      initialCount: initialData.count,
      itemDetails,
    },
  };
};

const MainPage = ({
  initialItems: initialItemsProp,
  initialCount,
  itemDetails: itemDetailsProp,
}: MainPageProps) => {
  const router = useRouter();
  const { page, id, search } = router.query;
  const { hideDetails, detailsOpened } = useCombinedContext();
  const { theme } = useContext(ThemeContext);
  const { selectedItems, error } = useContext(ItemsContext) as ItemsContextType;
  const [loading, setLoading] = useState(false);
  const [initialItems, setInitialItems] = useState(initialItemsProp);
  const [itemDetails, setItemDetails] = useState(itemDetailsProp);

  useEffect(() => {
    setInitialItems(initialItemsProp);
  }, [initialItemsProp]);

  useEffect(() => {
    setItemDetails(itemDetailsProp);
  }, [itemDetailsProp]);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  const searchHandler = (search: string) => {
    const queryParams: { page: string; search?: string } = { page: '1' };
    if (search && search != ' ') {
      queryParams.search = search;
    }
    router.push({
      pathname: '/',
      query: queryParams,
    });
  };

  const handleCloseDetails = (
    event: React.MouseEvent | React.KeyboardEvent,
  ) => {
    const queryParams: { page: string; search?: string } = {
      page: page as string,
    };
    if (
      (event.target as HTMLElement).tagName === 'H3' ||
      (event.target as HTMLElement).id === 'person-button' ||
      (event.target as HTMLElement).id === 'pagination-btn' ||
      (event.target as HTMLElement).closest('#person-button')
    ) {
      return false;
    }
    if (search && search != ' ') {
      queryParams.search = search as string;
    }
    setItemDetails(null);
    router.push({
      pathname: '/',
      query: queryParams,
    });
    hideDetails();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCloseDetails(event);
    }
  };

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
