import React, { createContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import { Flyout } from './Flyout';
import CombinedProvider from '../../context/ItemsContext';
import { MockItemsProvider } from '../../context/MockItemsContext';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const defaultThemeContextValue: ThemeContextType = {
  theme: 'light',
  setTheme: () => {},
};

export const MockThemeContext = createContext<ThemeContextType>(
  defaultThemeContextValue,
);

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

const defaultContextValue = {
  selectedItems: ['1'],
  isLoading: false,
  error: '',
  setIsLoading: vi.fn(),
  setError: vi.fn(),
  toggleSelectedItem: vi.fn(),
  unselectAllItems: vi.fn(),
};

describe('Flyout Component', () => {
  test('should render with the correct theme-based styling', () => {
    render(
      <CombinedProvider>
        <MockThemeContext.Provider value={defaultThemeContextValue}>
          <Flyout items={data} />
        </MockThemeContext.Provider>
        ,
      </CombinedProvider>,
    );

    const flyoutDiv = screen.getByText(/item\(s\) selected/i).closest('div');
    expect(flyoutDiv).toHaveAttribute(
      'class',
      expect.stringContaining('light'),
    );
  });

  test('renders with proper selected items counter', () => {
    render(
      <MockItemsProvider value={defaultContextValue}>
        <Flyout items={data} />
      </MockItemsProvider>,
    );

    expect(screen.getByText(/1 item\(s\) selected/i)).toBeInTheDocument();
  });

  test('button calls unselectAllItems', () => {
    render(
      <MockItemsProvider value={defaultContextValue}>
        <Flyout items={data} />
      </MockItemsProvider>,
    );

    fireEvent.click(screen.getByText(/Unselect all/i));
    expect(defaultContextValue.unselectAllItems).toHaveBeenCalledTimes(1);
  });

  test('download button calls CSV download', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');

    render(
      <MockItemsProvider value={defaultContextValue}>
        <Flyout items={data} />
      </MockItemsProvider>,
    );

    fireEvent.click(screen.getByText('Download'));

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
  });
});
