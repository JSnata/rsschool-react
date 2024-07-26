import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders MainPage component', () => {
  render(
    <Router>
      <App />
    </Router>,
  );
  expect(
    screen.getByText('Find your favourite character!'),
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});
