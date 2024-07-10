import React from 'react';
import { People } from '../types/types';
import styles from './ResultsList.module.css';

interface Props {
  results: People[];
}

const ResultsList = ({ results }: Props) => {
  return (
    <div className={styles.container}>
      {results.map((person, index) => (
        <div key={index} className={styles.resultItem}>
          <h3>Name: {person.name}</h3>
          <p>Birth Year: {person.birth_year}</p>
          <p>Eye Color: {person.eye_color}</p>
          <p>Gender: {person.gender}</p>
          <p>Hair Color: {person.hair_color}</p>
          <p>Height: {person.height} cm</p>
          <p>Mass: {person.mass} kg</p>
          <p>Skin Color: {person.skin_color}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsList;
