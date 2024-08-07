import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, afterEach, vi } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import MainPage from '../pages/index';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockrouter } from '../test-utils/mockRouter';
import { MockItemsProvider } from '../context/MockItemsContext';
import {
  defaultThemeContextValue,
  MockThemeContext,
} from '../test-utils/mockThemeContext';
import CombinedProvider from '../context/ItemsContext';

export const defaultContextValue = {
  selectedItems: ['1'],
  isLoading: false,
  error: '',
  setIsLoading: vi.fn(),
  setError: vi.fn(),
  toggleSelectedItem: vi.fn(),
  unselectAllItems: vi.fn(),
};

const data = [
  {
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
  },
  {
    name: 'Darth Vader',
    birth_year: '41.9BBY',
    eye_color: 'yellow',
    gender: 'male',
    hair_color: 'none',
    height: '202',
    mass: '136',
    skin_color: 'white',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/2/',
      'https://swapi.dev/api/films/3/',
      'https://swapi.dev/api/films/6/',
    ],
    species: [],
    vehicles: [],
    starships: ['https://swapi.dev/api/starships/13/'],
    created: '2014-12-10T15:18:20.704000Z',
    edited: '2014-12-20T21:17:50.313000Z',
    url: 'https://swapi.dev/api/people/4/',
  },
];

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

describe('MainPage Component', () => {
  test('renders MainPage component correctly', async () => {
    render(
      <RouterContext.Provider value={createMockrouter({})}>
        <MockItemsProvider value={defaultContextValue}>
          <CombinedProvider>
            <MockThemeContext.Provider value={defaultThemeContextValue}>
              <MainPage initialItems={data} initialCount={0} />
            </MockThemeContext.Provider>
          </CombinedProvider>
        </MockItemsProvider>
      </RouterContext.Provider>,
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
});
