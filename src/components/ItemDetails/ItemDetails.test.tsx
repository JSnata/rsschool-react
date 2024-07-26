import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { setupStore } from '../../store/store';
import ItemDetails from './ItemDetails';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { DetailsContext } from '../../App';
import { vi } from 'vitest';

const data = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  eye_color: 'blue',
  gender: 'male',
  hair_color: 'blond',
  height: '172',
  mass: '77',
  skin_color: 'fair',
  homeworld: 'https://swapi.dev/api/planets/1/',
  films: [
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/2/',
    'https://swapi.dev/api/films/3/',
    'https://swapi.dev/api/films/6/',
  ],
  species: [],
  vehicles: [
    'https://swapi.dev/api/vehicles/14/',
    'https://swapi.dev/api/vehicles/30/',
  ],
  starships: [
    'https://swapi.dev/api/starships/12/',
    'https://swapi.dev/api/starships/22/',
  ],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
};

const server = setupServer(
  http.get('https://swapi.dev/api/people/1/', () => {
    return HttpResponse.json(data);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const store = setupStore();

describe('ItemDetails component', () => {
  test('displays loading indicator while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <ReduxProvider store={store}>
          <Routes>
            <Route path="/details/:id" element={<ItemDetails />} />
          </Routes>
        </ReduxProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  test('detailed card component correctly displays the detailed card data', async () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <ReduxProvider store={store}>
          <DetailsContext.Provider
            value={{
              showDetails: vi.fn(),
              hideDetails: vi.fn(),
              detailsOpened: true,
            }}
          >
            <Routes>
              <Route path="/details/:id" element={<ItemDetails />} />
            </Routes>
          </DetailsContext.Provider>
        </ReduxProvider>
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText(data.name)).toBeInTheDocument();
      expect(
        screen.getByText(`Birth Year: ${data.birth_year}`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Eye Color: ${data.eye_color}`),
      ).toBeInTheDocument();
      expect(screen.getByText(`Gender: ${data.gender}`)).toBeInTheDocument();
      expect(
        screen.getByText(`Hair Color: ${data.hair_color}`),
      ).toBeInTheDocument();
      expect(screen.getByText(`Height: ${data.height} cm`)).toBeInTheDocument();
      expect(screen.getByText(`Mass: ${data.mass} kg`)).toBeInTheDocument();
      expect(
        screen.getByText(`Skin Color: ${data.skin_color}`),
      ).toBeInTheDocument();
    });
  });

  test('clicking the close button hides the component.', async () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <ReduxProvider store={store}>
          <DetailsContext.Provider
            value={{
              showDetails: vi.fn(),
              hideDetails: vi.fn(),
              detailsOpened: true,
            }}
          >
            <Routes>
              <Route path="/details/:id" element={<ItemDetails />} />
            </Routes>
          </DetailsContext.Provider>
        </ReduxProvider>
      </MemoryRouter>,
    );

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByText(`Birth Year: ${data.birth_year}`),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(`Eye Color: ${data.eye_color}`),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(`Gender: ${data.gender}`),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(`Hair Color: ${data.hair_color}`),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(`Height: ${data.height} cm`),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(`Mass: ${data.mass} kg`),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(`Skin Color: ${data.skin_color}`),
      ).not.toBeInTheDocument();
    });
  });
});
