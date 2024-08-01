import React from 'react';
import { People } from '../../types/types';
import styles from './ResultsList.module.css';
import ResultItem from '../ResultItem/ResultItem';

interface Props {
  results: People[];
}

const ResultsList = ({ results }: Props) => {
  {
    console.log('reload');
  }
  return (
    <ul className={styles.list}>
      {!results.length && <p>No results found.</p>}
      {results.map((person) => (
        <ResultItem key={person.url} person={person} />
      ))}
    </ul>
  );
};

export default ResultsList;
