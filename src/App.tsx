import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
};

export default App;
