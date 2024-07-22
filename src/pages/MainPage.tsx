import React, { useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ResultsList from '../components/ResultsList';
import Search from '../components/Search';
import styles from './MainPage.module.css';
import Pagination from '../components/Pagination';
import useSearchQuery from '../customHooks/useSearchQuery';
import { itemsAPI } from '../services/ItemsService';
import { setItems, setIsLoading, setError } from '../store/reducers/itemsSlice';
import { RootState } from '../store/store';

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
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const { data, error, isLoading } = itemsAPI.useFetchPeopleQuery(
    { page: currentPage, search: searchQuery },
    { skip: detailsOpened },
  );

  const items = useSelector((state: RootState) => state.items.items);

  useEffect(() => {
    if (data) {
      dispatch(setItems(data.results));
    }
    if (isLoading !== undefined) {
      dispatch(setIsLoading(isLoading));
    }
    if (error) {
      dispatch(setError(error.toString()));
    }
  }, [data, isLoading, error, dispatch]);

  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  const searchHandler = (query: string) => {
    setSearchQuery(query);
    setSearchParams({ page: '1' });
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

  if (error) {
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
        {isLoading && <h2>Loading....</h2>}
        {!isLoading && (!items || items.length === 0) && (
          <p>No results found.</p>
        )}
        {!isLoading && items.length > 0 && (
          <>
            <ResultsList results={items} onItemClick={handleItemClick} />
            <Pagination
              totalItemsCount={data?.count || 0}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
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
