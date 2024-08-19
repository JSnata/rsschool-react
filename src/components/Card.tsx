import React from 'react';
import { StoreFormData } from '../types/types';
import styles from './Card.module.css';

interface CardProps {
  data: StoreFormData;
  isNewFlag?: boolean;
}

function Card({ data, isNewFlag }: CardProps) {
  return (
    <div className={`${styles.card} ${isNewFlag ? styles.newCard : ''}`}>
      <div className={styles.cardContent}>
        <p>Name: {data.name}</p>
        <p>Age: {data.age}</p>
        <p>Email: {data.email}</p>
        <p>Password: {data.password}</p>
        <p>Gender: {data.gender}</p>
        <p>T&C accepted: {data.acceptTerms.toString()}</p>
        <p>Country: {data.country}</p>
        <img alt="Pic" src={data.picture} className={styles.image} />
      </div>
    </div>
  );
}

export default Card;
