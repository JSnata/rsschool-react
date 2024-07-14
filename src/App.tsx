import React, { useState } from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import ErrorBoundary from './components/ErrorBoundary';
import { Route, Routes } from 'react-router-dom';
import ItemDetails from './components/ItemDetails';

export const DetailsContext = React.createContext({
  showDetails: () => {},
  hideDetails: () => {},
  detailsOpened: false,
});

const App = () => {
  const [detailsOpened, setDetailsOpened] = useState(false);

  const showDetails = () => setDetailsOpened(true);
  const hideDetails = () => setDetailsOpened(false);

  return (
    <DetailsContext.Provider
      value={{ showDetails, hideDetails, detailsOpened }}
    >
      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                detailsOpened={detailsOpened}
                hideDetails={hideDetails}
                showDetails={showDetails}
              />
            }
          >
            <Route path="details/:id" element={<ItemDetails />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </DetailsContext.Provider>
  );
};

export default App;
