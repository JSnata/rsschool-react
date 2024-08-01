import React from 'react';
import { AppProps } from 'next/app';
import '../global.css';
import { Provider as ReduxProvider } from 'react-redux';
import { setupStore } from '../store/store';
import ErrorBoundary from '../components/ErrorBoundary';
import { DetailsProvider } from '../context/DetailsContext';

export const App = ({ Component, pageProps }: AppProps) => {
  const store = setupStore();

  return (
    <ReduxProvider store={store}>
      <DetailsProvider>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </DetailsProvider>
    </ReduxProvider>
  );
};

export default App;
