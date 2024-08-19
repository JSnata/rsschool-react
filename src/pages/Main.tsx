import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import styles from './Main.module.css';
import Card from '../components/Card';
import MainHeader from '../components/MainHeader';

const Main = () => {
  const data = useSelector((state: RootState) => state.form.formDataList);

  return (
    <div className={styles.mainPage}>
      <MainHeader />
      <div className={styles.cards}>
        <h2>Submits list</h2>
        {data.length > 0 ? (
          data
            .slice()
            .reverse()
            .map((data, index) => (
              <Card isNewFlag={index === 0} key={index} data={data} />
            ))
        ) : (
          <p>No submits</p>
        )}
      </div>
    </div>
  );
};

export default Main;
