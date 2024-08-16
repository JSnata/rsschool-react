import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import styles from './Main.module.css';
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
      <div className={styles.cards}>
        <h3>Data</h3>
        {data.length > 0 ? (
          data
            .slice()
            .reverse()
            .map((data, index) => (
              <Card isNewFlag={index === 0} key={index} data={data} />
            ))
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
};

export default Main;
