import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pagination from './Pagination';

describe('Pagination component', () => {
  test('updates URL query parameter when page changes', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Pagination totalItemsCount={100} currentPage={1} />}
          />
        </Routes>
      </BrowserRouter>,
    );

    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    await waitFor(() => {
      expect(window.location.search).toBe('?page=2');
    });
  });
});
