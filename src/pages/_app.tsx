import React from 'react';
import { AppProps } from 'next/app';
import '../global.css';
import CombinedProvider from '../context/ItemsContext';
import { ThemeProvider } from '../context/ThemeContext';

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CombinedProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </CombinedProvider>
  );
};

export default App;
