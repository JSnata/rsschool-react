import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResultsList from './ResultsList';
import { Provider as ReduxProvider } from 'react-redux';
import { setupStore } from '../store/store';
const store = setupStore();

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

describe('ResultsList component', () => {
  test('appropriate message is displayed if no cards are present', () => {
    render(
      <MemoryRouter>
        <ReduxProvider store={store}>
          <ResultsList results={[]} />
        </ReduxProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });
  test('component renders the specified number of cards', () => {
    render(
      <MemoryRouter>
        <ReduxProvider store={store}>
          <ResultsList results={data} />
        </ReduxProvider>
      </MemoryRouter>,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(data.length);
  });
});
