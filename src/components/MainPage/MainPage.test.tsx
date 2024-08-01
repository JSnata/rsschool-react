import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, afterEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import MainPage from './MainPage';
import { setupStore } from '../../store/store';

const server = setupServer(
  http.get('https://swapi.dev/api/people', () => {
    return HttpResponse.json({
      results: [
        {
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          eye_color: 'blue',
          gender: 'male',
          hair_color: 'blond',
          height: '172',
          mass: '77',
          skin_color: 'fair',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
      count: 1,
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const store = setupStore();

describe('MainPage Component', () => {
  test('renders MainPage component correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  detailsOpened={false}
                  hideDetails={() => {}}
                  showDetails={() => {}}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Dark theme' || 'Light theme' }),
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'New Error!' }),
      ).toBeInTheDocument();
    });
  });

  test('toggles theme on button click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  detailsOpened={false}
                  hideDetails={() => {}}
                  showDetails={() => {}}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const themeButton = screen.getByRole('button', { name: 'Dark theme' });
    fireEvent.click(themeButton);
    expect(themeButton).toHaveTextContent('Light theme');
  });
});
