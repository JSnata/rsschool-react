import React, { useContext } from 'react';
import styles from './ToggleTheme.module.css';
import { ThemeContext } from '../../pages/MainPage';

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
