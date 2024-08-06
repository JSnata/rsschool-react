import React from 'react';
import { render } from '@testing-library/react';
import { App } from '../pages/_app';
import { router } from 'next/client';

describe('App component', () => {
  test('renders', () => {
    render(<App Component={App} pageProps={{}} router={router} />);
  });
});
