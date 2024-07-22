import React, { useContext } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './ItemDetails.module.css';
import { DetailsContext } from '../App';
import { itemsAPI } from '../services/ItemsService';

const ItemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hideDetails } = useContext(DetailsContext);
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const { data, error, isLoading } = itemsAPI.useFetchPersonByIdQuery(id);

  const handleClose = () => {
    hideDetails();
    navigate(`/?page=${currentPage}`);
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <p>Error loading item details.</p>;
  }

  if (!data) {
    return <p>Item not found.</p>;
  }

  return (
    <div className={styles.detailsContainer}>
      <button onClick={handleClose} className={styles.closeButton}>
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
