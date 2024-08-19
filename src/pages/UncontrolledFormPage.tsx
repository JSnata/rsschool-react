import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveFormData } from '../redux/slices/formSlice';
import { useNavigate } from 'react-router';
import { validationSchema } from '../utils/validationSchema';
import { ValidationError } from 'yup';
import UncontrolledField from '../components/UncontrolledField';
import styles from './Form.module.css';
import { RootState } from '../redux/store';
import { PasswordIndicator } from '../components/PasswordIndicator';
import { usePasswordStrength } from '../customHooks/usePasswordStrength';

function UncontrolledFormPage() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const countries = useSelector((state: RootState) => state.form.countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { passwordChecks, handlePasswordChange } = usePasswordStrength();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value) || 0,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      acceptTerms: acceptTermsRef.current?.checked || false,
      picture: pictureRef.current?.files || null,
      country: countryRef.current?.value || '',
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      if (formData.picture && formData.picture[0]) {
        const pictureFile = formData.picture[0];
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result as string;
          const dataWithBase64Picture = {
            ...formData,
            picture: base64String,
          };

          dispatch(saveFormData(dataWithBase64Picture));
          navigate('/');
        };

        reader.readAsDataURL(pictureFile);
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const newErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          newErrors[err.path!] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Uncontrolled Form</h2>
      <form onSubmit={handleSubmit}>
        <UncontrolledField
          id="name"
          label="Name"
          type="text"
          ref={nameRef}
          placeholder="Enter your name"
          error={errors.name}
        />
        <UncontrolledField
          id="age"
          label="Age"
          type="text"
          ref={ageRef}
          placeholder="Enter your age"
          error={errors.age}
        />
        <UncontrolledField
          id="email"
          label="Email"
          type="email"
          ref={emailRef}
          placeholder="Enter your email"
          error={errors.email}
        />

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="Enter your password"
            autoComplete="off"
          />
          <PasswordIndicator passwordChecks={passwordChecks} />
          <div className={styles.errorMessage}>{errors.password}</div>
        </div>

        <UncontrolledField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          ref={confirmPasswordRef}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
        />

        <div className={`${styles.formGroup}`}>
          <label htmlFor="gender">Gender</label>
          <select id="gender" ref={genderRef}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <div className={styles.errorMessage}>{errors.gender}</div>
        </div>

        <UncontrolledField
          id="country"
          label="Country"
          type="text"
          ref={countryRef}
          placeholder="Enter your country"
          error={errors.country}
          list="countrydata"
          autocomplete="off"
        />

        <div className={`${styles.formGroup} ${styles['checkbox-container']}`}>
          <input type="checkbox" id="acceptTerms" ref={acceptTermsRef} />
          <label htmlFor="acceptTerms">Accept Terms</label>
          <div className={styles.errorMessage}>{errors.acceptTerms}</div>
        </div>

        <div className={`${styles.formGroup}`}>
          <label htmlFor="picture">Picture</label>
          <input type="file" id="picture" ref={pictureRef} />
          <div className={styles.errorMessage}>{errors.picture}</div>
        </div>

        <datalist id="countrydata">
          {countries &&
            countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
        </datalist>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UncontrolledFormPage;
