import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { People } from '../types/types';
import styles from './ResultsList.module.css';
import { RootState } from '../store/store';
import { toggleSelectedItem } from '../store/reducers/itemsSlice';

interface Props {
  results: People[];
  onItemClick: (id: string) => void;
}

const ResultsList = ({ results, onItemClick }: Props) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.items.selectedItems,
  );

  const onCheckboxChange = (id: string) => {
    dispatch(toggleSelectedItem(id));
  };

  return (
    <div className={styles.container}>
      {results.map((person, index) => (
        <div key={index} className={styles.resultItem}>
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
              onItemClick(person.url.split('/').filter(Boolean).pop()!)
            }
          >
            <h3>{person.name}</h3>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ResultsList;
