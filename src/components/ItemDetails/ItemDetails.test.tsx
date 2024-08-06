import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ItemDetails from './ItemDetails';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { MockItemsProvider } from '../../context/MockItemsContext';
import { createMockrouter } from '../../test-utils/mockRouter';
import { vi } from 'vitest';
import * as originalModule from '../../pages';
import { DetailsProvider } from '../../context/DetailsContext';

export const defaultContextValue = {
  selectedItems: ['1'],
  isLoading: false,
  error: '',
  setIsLoading: vi.fn(),
  setError: vi.fn(),
  toggleSelectedItem: vi.fn(),
  unselectAllItems: vi.fn(),
};

vi.mock('../../pages', async () => {
  const actual = await vi.importActual<typeof originalModule>('../../pages');
  return {
    ...actual,
    getServerSideProps: vi.fn(async () => ({
      props: {
        initialItems: data,
        initialCount: 1,
        itemDetails: data[0],
      },
    })),
  };
});

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
];

const mockRouter = createMockrouter({
  query: { id: '1' },
});

describe('ItemDetails component', () => {
  test('detailed card component correctly displays the detailed card data', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <DetailsProvider>
          <MockItemsProvider value={defaultContextValue}>
            <ItemDetails data={data[0]} handleClose={vi.fn} />
          </MockItemsProvider>
        </DetailsProvider>
      </RouterContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(data[0].name)).toBeInTheDocument();
      expect(
        screen.getByText(`Birth Year: ${data[0].birth_year}`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Eye Color: ${data[0].eye_color}`),
      ).toBeInTheDocument();
      expect(screen.getByText(`Gender: ${data[0].gender}`)).toBeInTheDocument();
      expect(
        screen.getByText(`Hair Color: ${data[0].hair_color}`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Height: ${data[0].height} cm`),
      ).toBeInTheDocument();
      expect(screen.getByText(`Mass: ${data[0].mass} kg`)).toBeInTheDocument();
      expect(
        screen.getByText(`Skin Color: ${data[0].skin_color}`),
      ).toBeInTheDocument();
    });
  });
});
