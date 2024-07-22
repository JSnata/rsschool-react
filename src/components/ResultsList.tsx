import React from 'react';
import { People } from '../types/types';
import styles from './ResultsList.module.css';

interface Props {
  results: People[];
  onItemClick: (id: string) => void;
}

const ResultsList = ({ results, onItemClick }: Props) => {
  return (
    <div className={styles.container}>
      {results.map((person) => (
        <button
          key={person.url}
          className={styles.resultItem}
          onClick={() =>
            onItemClick(person.url.split('/').filter(Boolean).pop()!)
          }
        >
          <h3>{person.name}</h3>
        </button>
      ))}
    </div>
  );
};

export default ResultsList;
