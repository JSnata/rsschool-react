import React from 'react';
import { StoreFormData } from '../types/types';

function Card({ ...data }: StoreFormData) {
  return (
    <div>
      <p>Name: {data.name}</p>
      <p>Age: {data.age}</p>
      <p>Email: {data.email}</p>
      <p>Password: {data.password}</p>
      <p>Gender: {data.gender}</p>
      <p>T&C accepted: {data.acceptTerms.toString()}</p>
      <p>Country: {data.country}</p>
      <img
        src={data.picture}
        alt="Uploaded"
        style={{ maxWidth: '200px', height: 'auto' }}
      />
    </div>
  );
}

export default Card;
