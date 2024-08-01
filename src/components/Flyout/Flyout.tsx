import React, { useContext } from 'react';
import styles from './Flyout.module.css';
import { ThemeContext } from '../MainPage/MainPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { unselectAllItems } from '../../store/reducers/itemsSlice';

interface FlyoutProps {
  downloadHandler: () => void;
}
export const Flyout = ({ downloadHandler }: FlyoutProps) => {
  const { theme } = useContext(ThemeContext);
  const selectedItems = useSelector(
    (state: RootState) => state.items.selectedItems,
  );
  const dispatch = useDispatch();
  const handleUnselectAll = () => {
    dispatch(unselectAllItems());
  };
  return (
    <div className={`${styles.flyout} ${styles[theme]}`}>
      <h3>{selectedItems.length} item(s) selected</h3>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={downloadHandler}>Download</button>
    </div>
  );
};

export default Flyout;
