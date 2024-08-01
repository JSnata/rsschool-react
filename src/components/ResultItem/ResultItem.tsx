import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { People } from '../../types/types';
import styles from '../ResultsList/ResultsList.module.css';
import { RootState } from '../../store/store';
import { toggleSelectedItem } from '../../store/reducers/itemsSlice';
import { ThemeContext } from '../MainPage/MainPage';
import { useDetails } from '../../context/DetailsContext';
import { useRouter } from 'next/router';

interface Props {
  person: People;
}

const ResultItem = ({ person }: Props) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { showDetails } = useDetails();
  const router = useRouter();
  const { page } = router.query;
  const currentPage = parseInt((page as string) || '1', 10);

  const selectedItems = useSelector(
    (state: RootState) => state.items.selectedItems,
  );
  const onCheckboxChange = (id: string) => {
    dispatch(toggleSelectedItem(id));
  };

  const handleItemClick = (id: string) => {
    router.push(
      {
        pathname: '/',
        query: { id, page: currentPage },
      },
      undefined,
      { shallow: true },
    );
    showDetails(id);
  };
  return (
    <li key={person.url} className={`${styles.resultItem} ${styles[theme]}`}>
      <input
        type="checkbox"
        checked={selectedItems.includes(
          person.url.split('/').filter(Boolean).pop()!,
        )}
        onChange={() =>
          onCheckboxChange(person.url.split('/').filter(Boolean).pop()!)
        }
      />
      <button
        onClick={() =>
          handleItemClick(person.url.split('/').filter(Boolean).pop()!)
        }
      >
        <h3>{person.name}</h3>
      </button>
    </li>
  );
};

export default ResultItem;
