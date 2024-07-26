import React, { useState, useEffect } from 'react';
import styles from './ErrorButton.module.css';

const ErrorButton = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      throw new Error('Error boundary wrapper works! Error occurred');
    }
  }, [hasError]);

  const throwError = () => {
    setHasError(true);
  };

  return (
    <button className={styles.errorButton} onClick={throwError}>
      New Error!
    </button>
  );
};

export default ErrorButton;
