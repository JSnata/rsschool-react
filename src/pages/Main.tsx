import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import Card from '../components/Card';

const Main = () => {
  const data = useSelector((state: RootState) => state.form.formDataList);

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
        <h3>Form Submissions:</h3>
        {data.length > 0 ? (
          data.map((data, index) => <Card key={index} {...data} />)
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
};

export default Main;
