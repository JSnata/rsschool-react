import React, { useContext } from 'react';
import { People } from '../../types/types';
import styles from '../ResultsList/ResultsList.module.css';
import { useDetails } from '../../context/DetailsContext';
import { useRouter } from 'next/router';
import { ThemeContext } from '../../context/ThemeContext';
import { ItemsContext, ItemsContextType } from '../../context/ItemsContext';

interface Props {
  person: People;
}

const ResultItem = ({ person }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { showDetails } = useDetails();
  const router = useRouter();
  const { page, search } = router.query;
  const currentPage = parseInt((page as string) || '1', 10);
  const { selectedItems, toggleSelectedItem } = useContext(
    ItemsContext,
  ) as ItemsContextType;

  const onCheckboxChange = (id: string) => {
    toggleSelectedItem(id);
  };

  const handleItemClick = (id: string) => {
    const queryParams: { page: string; search?: string } = {
      page: currentPage.toString(),
    };

    if (search) {
      queryParams.search = search as string;
    }

    router.push({
      pathname: '/',
      query: { id, ...queryParams },
    });
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
