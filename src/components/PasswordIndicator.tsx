import React from 'react';
import styles from '../pages/Form.module.css';

export const PasswordIndicator = ({
  passwordChecks,
}: {
  passwordChecks: {
    number: boolean;
    uppercase: boolean;
    lowercase: boolean;
    specialChar: boolean;
  };
}) => (
  <div className={styles.passwordIndicator}>
    <span className={passwordChecks.number ? styles.valid : styles.invalid}>
      Number
    </span>{' '}
    -{' '}
    <span className={passwordChecks.uppercase ? styles.valid : styles.invalid}>
      Uppercase letter
    </span>{' '}
    -{' '}
    <span className={passwordChecks.lowercase ? styles.valid : styles.invalid}>
      Lowercase letter
    </span>{' '}
    -{' '}
    <span
      className={passwordChecks.specialChar ? styles.valid : styles.invalid}
    >
      Special character
    </span>
  </div>
);
