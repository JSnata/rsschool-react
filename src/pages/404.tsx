import React from 'react';
import { useRouter } from 'next/router';
import styles from './ErrorPage.module.css';

const Custom404 = () => {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <h1>404 - Page Not Found</h1>
      <button onClick={() => router.back()}>Go Back</button>
    </div>
  );
};

export default Custom404;
