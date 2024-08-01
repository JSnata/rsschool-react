import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { itemsAPI } from '../../services/ItemsService';
import {
  setSelectedItem,
  setIsLoading,
  setError,
} from '../../store/reducers/itemsSlice';
import { RootState } from '../../store/store';
import styles from './ItemDetails.module.css';
import { ThemeContext } from '../MainPage/MainPage';

const ItemDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { page } = router.query;
  const currentPage = parseInt((page as string) || '1', 10);

  const { data, error, isLoading } = itemsAPI.useFetchPersonByIdQuery(
    id as string,
  );

  const selectedItem = useSelector(
    (state: RootState) => state.items.selectedItem,
  );

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (data) {
      dispatch(setSelectedItem(data));
    }
    if (isLoading !== undefined) {
      dispatch(setIsLoading(isLoading));
    }
    if (error) {
      dispatch(setError(error.toString()));
    }
  }, [data, isLoading, error, dispatch]);

  const handleClose = () => {
    router.push(
      {
        pathname: '/',
        query: { page: currentPage.toString() },
      },
      undefined,
      { shallow: true },
    );
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (!selectedItem) {
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
      <h3>{selectedItem.name}</h3>
      <p>Birth Year: {selectedItem.birth_year}</p>
      <p>Eye Color: {selectedItem.eye_color}</p>
      <p>Gender: {selectedItem.gender}</p>
      <p>Hair Color: {selectedItem.hair_color}</p>
      <p>Height: {selectedItem.height} cm</p>
      <p>Mass: {selectedItem.mass} kg</p>
      <p>Skin Color: {selectedItem.skin_color}</p>
    </div>
  );
};

export default ItemDetails;
