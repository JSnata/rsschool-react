import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
};

function ControlledFormPage() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Controlled Form Data:', data);
  };

  return (
    <div>
      <h2>Controlled Form (React Hook Form)</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" {...register('name')} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ControlledFormPage;
