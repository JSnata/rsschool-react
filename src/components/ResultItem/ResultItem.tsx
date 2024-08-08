'use client';

import React, { useContext } from 'react';
import { People } from '../../types/types';
import styles from '../ResultsList/ResultsList.module.css';
import { useDetails } from '../../context/DetailsContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeContext } from '../../context/ThemeContext';
import { ItemsContext, ItemsContextType } from '../../context/ItemsContext';

interface Props {
  person: People;
}

const ResultItem = ({ person }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { showDetails } = useDetails();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const search = searchParams.get('search') || '';
  const currentPage = parseInt(page, 10);
  const { selectedItems, toggleSelectedItem } = useContext(
    ItemsContext,
  ) as ItemsContextType;

  const onCheckboxChange = (id: string) => {
    toggleSelectedItem(id);
  };

  const handleItemClick = (id: string) => {
    const queryParams = new URLSearchParams({ page: currentPage.toString() });
    if (search) {
      queryParams.set('search', search);
    }
    queryParams.set('id', id);

    router.push(`/?${queryParams.toString()}`);
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
        id="person-button"
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
