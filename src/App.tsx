import React, { useState } from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import ErrorBoundary from './components/ErrorBoundary';
import { Route, Routes } from 'react-router-dom';
import ItemDetails from './components/ItemDetails';
import { Provider as ReduxProvider } from 'react-redux';
import { setupStore } from './store/store';

export const DetailsContext = React.createContext({
  showDetails: () => {},
  hideDetails: () => {},
  detailsOpened: false,
});

const App = () => {
  const [detailsOpened, setDetailsOpened] = useState(false);
  const showDetails = () => setDetailsOpened(true);
  const hideDetails = () => setDetailsOpened(false);

  const store = setupStore();

  return (
    <ReduxProvider store={store}>
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
    </ReduxProvider>
  );
};

export default App;
