import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      <h2>Main Page</h2>
      <p>
        <Link to="/uncontrolled">Uncontrolled Form</Link>
      </p>
      <p>
        <Link to="/controlled">Controlled Form with React Hook Form</Link>
      </p>
    </div>
  );
};

export default Main;
