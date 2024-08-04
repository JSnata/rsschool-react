import React from 'react';
import { AppProps } from 'next/app';
import '../global.css';
import ErrorBoundary from '../components/ErrorBoundary';
import CombinedProvider from '../context/ItemsContext';
import { ThemeProvider } from '../context/ThemeContext';

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CombinedProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </CombinedProvider>
  );
};

export default App;
