import React, { createContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
import { Flyout } from '../components/Flyout';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const defaultContextValue: ThemeContextType = {
  theme: 'light',
  setTheme: () => {},
};

export const MockThemeContext =
  createContext<ThemeContextType>(defaultContextValue);

const store = setupStore();

describe('Flyout Component', () => {
  test('should render with the correct theme-based styling', () => {
    render(
      <Provider store={store}>
        <MockThemeContext.Provider value={defaultContextValue}>
          <Flyout downloadHandler={vi.fn()} />
        </MockThemeContext.Provider>
      </Provider>,
    );

    const flyoutDiv = screen.getByText(/item\(s\) selected/i).closest('div');
    expect(flyoutDiv).toHaveAttribute(
      'class',
      expect.stringContaining('light'),
    );
  });

  test('should call downloadHandler when "Download" button is clicked', () => {
    const mockDownloadHandler = vi.fn();

    render(
      <Provider store={store}>
        <MockThemeContext.Provider value={defaultContextValue}>
          <Flyout downloadHandler={mockDownloadHandler} />
        </MockThemeContext.Provider>
      </Provider>,
    );
    fireEvent.click(screen.getByText(/Download/i));

    expect(mockDownloadHandler).toHaveBeenCalled();
  });
});
