import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';

const Main = () => {
  const controlledData = useSelector(
    (state: RootState) => state.form.controlledData,
  );
  return (
    <div>
      <h2>Main Page</h2>
      <p>
        <Link to="/uncontrolled">Uncontrolled Form</Link>
      </p>
      <p>
        <Link to="/controlled">Controlled Form with React Hook Form</Link>
      </p>
      <div>
        <h3>Controlled data:</h3>
        {controlledData ? (
          <div>
            <p>Name: {controlledData.name}</p>
          </div>
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
};

export default Main;
