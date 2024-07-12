import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import ErrorBoundary from './components/ErrorBoundary';
import { Route, Routes } from 'react-router-dom';
import ItemDetails from './components/ItemDetails';

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="details/:id" element={<ItemDetails />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
