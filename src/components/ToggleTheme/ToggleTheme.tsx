import React, { useContext } from 'react';
import styles from './ToggleTheme.module.css';
import { ThemeContext } from '../MainPage/MainPage';

function ToggleTheme() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme} className={styles.toggleButton}>
      {theme === 'light' ? 'Dark' : 'Light'} theme
    </button>
  );
}

export default ToggleTheme;
