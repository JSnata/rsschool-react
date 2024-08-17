import React, { forwardRef } from 'react';
import styles from '../pages/Form.module.css';

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  autocomplete?: 'on' | 'off' | string;
  list?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UncontrolledField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      label,
      type = 'text',
      placeholder,
      required = false,
      error,
      onChange,
      autocomplete = 'on',
      list,
    },
    ref,
  ) => {
    return (
      <div className={`${styles.formGroup}`}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          ref={ref}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          autoComplete={autocomplete}
          list={list}
        />
        <div className={styles.errorMessage}>{error ? error : ''}</div>
      </div>
    );
  },
);

UncontrolledField.displayName = 'UncontrolledField';

export default UncontrolledField;
