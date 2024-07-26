import React from 'react';

import {
  useNavigate,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router-dom';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError() as Error;

  if (!isRouteErrorResponse(error)) {
    return null;
  }
  return (
    <div className={styles.page}>
      <h1>404 page not found</h1>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default ErrorPage;
