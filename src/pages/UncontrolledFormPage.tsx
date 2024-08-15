import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveUncontrolledData } from '../redux/slices/formSlice';
import { useNavigate } from 'react-router';
import { validationSchema } from '../utils/validationSchema';
import { ValidationError } from 'yup';

function UncontrolledFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

          dispatch(saveUncontrolledData(dataWithBase64Picture));
          navigate('/');
        };

        reader.readAsDataURL(pictureFile);
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const newErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          newErrors[err.path as string] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameRef} />
        {errors.name && <div>{errors.name}</div>}
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input type="number" id="age" ref={ageRef} />
        {errors.age && <div>{errors.age}</div>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailRef} />
        {errors.email && <div>{errors.email}</div>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordRef} />
        {errors.password && <div>{errors.password}</div>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" ref={confirmPasswordRef} />
        {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
      </div>

      <div>
        <label htmlFor="gender">Gender</label>
        <select id="gender" ref={genderRef}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <div>{errors.gender}</div>}
      </div>

      <div>
        <label htmlFor="acceptTerms">Accept Terms</label>
        <input type="checkbox" id="acceptTerms" ref={acceptTermsRef} />
        {errors.acceptTerms && <div>{errors.acceptTerms}</div>}
      </div>

      <div>
        <label htmlFor="picture">Picture</label>
        <input type="file" id="picture" ref={pictureRef} />
        {errors.picture && <div>{errors.picture}</div>}
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <input type="text" id="country" ref={countryRef} />
        {errors.country && <div>{errors.country}</div>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledFormPage;
