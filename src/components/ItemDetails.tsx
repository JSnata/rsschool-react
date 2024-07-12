import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { People } from '../types/types';
import styles from './ItemDetails.module.css';

const ItemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<People | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`https://swapi.dev/api/people/${id}/`)
        .then((response) => {
          setDetails(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching details:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleClose = () => {
    navigate('/');
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!details) {
    return <p>Item not found.</p>;
  }

  return (
    <div className={styles.detailsContainer}>
      <button onClick={handleClose} className={styles.closeButton}>
        Close
      </button>
      <h2>Details:</h2>
      <h3>{details.name}</h3>
      <p>Birth Year: {details.birth_year}</p>
      <p>Eye Color: {details.eye_color}</p>
      <p>Gender: {details.gender}</p>
      <p>Hair Color: {details.hair_color}</p>
      <p>Height: {details.height} cm</p>
      <p>Mass: {details.mass} kg</p>
      <p>Skin Color: {details.skin_color}</p>
    </div>
  );
};

export default ItemDetails;
