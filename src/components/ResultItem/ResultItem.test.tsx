import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultItem from './ResultItem';
import CombinedProvider from '../../context/ItemsContext';
import { createMockrouter } from '../../test-utils/mockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === 'page') return '1';
      if (key === 'search') return '';
      return '';
    },
  }),
}));

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

describe('ResultItem component', () => {
  it('the card component renders the relevant card data', () => {
    render(
      <RouterContext.Provider value={createMockrouter({})}>
        <CombinedProvider>
          <ResultItem person={data} />
        </CombinedProvider>
      </RouterContext.Provider>,
    );
    expect(screen.getByText(data.name)).toBeInTheDocument();
  });
});
