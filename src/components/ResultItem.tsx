import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { People } from '../types/types';
import styles from './ResultsList.module.css';
import { RootState } from '../store/store';
import { toggleSelectedItem } from '../store/reducers/itemsSlice';
import { ThemeContext } from '../pages/MainPage';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DetailsContext } from '../App';

interface Props {
  person: People;
}

const ResultItem = ({ person }: Props) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const { showDetails } = useContext(DetailsContext);

  const selectedItems = useSelector(
    (state: RootState) => state.items.selectedItems,
  );
  const onCheckboxChange = (id: string) => {
    dispatch(toggleSelectedItem(id));
  };

  const handleItemClick = (id: string) => {
    navigate(`details/${id}?page=${currentPage}`);
    showDetails();
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
