import React, { useContext, useEffect } from 'react';
import styles from './ToggleTheme.module.css';
import { ThemeContext } from '../../context/ThemeContext';

function ToggleTheme() {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === 'light' ? '#fff' : '#2b2b2b';
  });

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
