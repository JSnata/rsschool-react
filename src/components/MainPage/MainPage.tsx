import React, { createContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import ResultsList from '../ResultsList/ResultsList';
import Search from '../Search/Search';
import styles from './MainPage.module.css';
import Pagination from '../Pagination/Pagination';
import useSearchQuery from '../../customHooks/useSearchQuery';
import { itemsAPI } from '../../services/ItemsService';
import {
  setItems,
  setIsLoading,
  setError,
} from '../../store/reducers/itemsSlice';
import { RootState } from '../../store/store';
import ErrorButton from '../ErrorButton/ErrorButton';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import Flyout from '../Flyout/Flyout';
import { useRouter } from 'next/router';
import { useDetails } from '../../context/DetailsContext';

const ItemDetails = dynamic(() => import('../ItemDetails/ItemDetails'));

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const defaultContextValue: ThemeContextType = {
  theme: 'light',
  setTheme: () => {},
};

export const ThemeContext =
  createContext<ThemeContextType>(defaultContextValue);

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const router = useRouter();
  const dispatch = useDispatch();
  const { page, id } = router.query;
  const currentPage = parseInt((page as string) || '1', 10);
  const [theme, setTheme] = useState('light');

  const { detailsOpened, hideDetails } = useDetails();

  const { data, error, isLoading } = itemsAPI.useFetchPeopleQuery(
    { page: currentPage, search: searchQuery },
    { skip: detailsOpened },
  );

  const items = useSelector((state: RootState) => state.items.items);
  const selectedItems = useSelector(
    (state: RootState) => state.items.selectedItems,
  );

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

  const searchHandler = (query: string) => {
    setSearchQuery(query);
    console.log(searchQuery);

    router.push({
      pathname: '/',
      query: { page: '1' },
    });
  };

  const handleCloseDetails = () => {
    router.push(
      {
        pathname: '/',
        query: { page: currentPage.toString() },
      },
      undefined,
      { shallow: true },
    );
    hideDetails();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCloseDetails();
    }
  };

  const downloadHandler = () => {
    const selectedDetails = items
      .filter((item) => {
        const itemId = item.url.split('/').filter(Boolean).pop();
        return selectedItems.includes(itemId!);
      })
      .map((item) => ({
        name: item.name,
        birthYear: item.birth_year,
        eyeColor: item.eye_color,
        gender: item.gender,
        hairColor: item.hair_color,
        height: item.height,
        mass: item.mass,
        skinColor: item.skin_color,
        url: item.url,
      }));

    const escapeCsvField = (field: string) => {
      if (field.includes('"') || field.includes(',') || field.includes('\n')) {
        field = field.replace(/"/g, '""');
        return `"${field}"`;
      }
      return field;
    };

    let content = 'data:text/csv;charset=utf-8,';
    const headerContent =
      'name,birth year,eye color,gender,hair color,height,mass,skin color,url\n';
    content += headerContent;

    selectedDetails.forEach((item) => {
      const itemContent = [
        escapeCsvField(item.name),
        escapeCsvField(item.birthYear),
        escapeCsvField(item.eyeColor),
        escapeCsvField(item.gender),
        escapeCsvField(item.hairColor),
        escapeCsvField(item.height),
        escapeCsvField(item.mass),
        escapeCsvField(item.skinColor),
        escapeCsvField(item.url),
      ].join(',');

      content += itemContent + '\n';
    });

    const encodedUri = encodeURI(content);
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', encodedUri);
    downloadLink.setAttribute('download', `${selectedItems.length}_people.csv`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`${styles.container} mainPage ${theme}`}>
        <div
          className={styles.searchWrapper}
          onClick={id ? handleCloseDetails : undefined}
          onKeyDown={id ? handleKeyDown : undefined}
          role="button"
          tabIndex={0}
        >
          <ToggleTheme />
          <h3 className={`${styles.heading} ${styles[theme]}`}>
            Find your favourite character!
          </h3>
          <Search searchHandler={searchHandler} />
          {/* {isLoading && <h2>Loading....</h2>} */}
          {(!items || items.length === 0) && <p>No results found.</p>}
          {items.length > 0 && (
            <>
              <ResultsList results={items} />
              <Pagination
                totalItemsCount={data?.count || 0}
                currentPage={currentPage}
              />
              <ErrorButton />
            </>
          )}
        </div>
        {Boolean(id) && (
          <div className={styles.detailsWrapper}>
            <ItemDetails />
          </div>
        )}
        {selectedItems.length > 0 && (
          <Flyout downloadHandler={downloadHandler} />
        )}
      </div>
    </ThemeContext.Provider>
  );
};

export default MainPage;
