import { useState } from 'react';

export function usePasswordStrength() {
  const [passwordChecks, setPasswordChecks] = useState({
    number: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
  });

  const handlePasswordChange = (password: string) => {
    setPasswordChecks({
      number: /\d/.test(password),
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  return {
    passwordChecks,
    handlePasswordChange,
  };
}
