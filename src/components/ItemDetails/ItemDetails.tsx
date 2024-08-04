import React, { useContext } from 'react';
import styles from './ItemDetails.module.css';
import { ThemeContext } from '../../context/ThemeContext';
import { People } from '../../types/types';

interface ItemDetailsprops {
  data: People;
  handleClose: () => void;
}

const ItemDetails = ({ data, handleClose }: ItemDetailsprops) => {
  const { theme } = useContext(ThemeContext);

  if (!data) {
    return <p>Item not found.</p>;
  }

  return (
    <div className={`${styles.detailsContainer} ${styles[theme]}`}>
      <button
        onClick={handleClose}
        className={`${styles.closeButton} ${styles[theme]}`}
      >
        Close
      </button>
      <h2>Details:</h2>
      <h3>{data.name}</h3>
      <p>Birth Year: {data.birth_year}</p>
      <p>Eye Color: {data.eye_color}</p>
      <p>Gender: {data.gender}</p>
      <p>Hair Color: {data.hair_color}</p>
      <p>Height: {data.height} cm</p>
      <p>Mass: {data.mass} kg</p>
      <p>Skin Color: {data.skin_color}</p>
    </div>
  );
};

export default ItemDetails;
