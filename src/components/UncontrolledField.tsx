import React, { forwardRef } from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
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
    },
    ref,
  ) => {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          ref={ref}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    );
  },
);
UncontrolledField.displayName = 'UncontrolledField';

export default UncontrolledField;
