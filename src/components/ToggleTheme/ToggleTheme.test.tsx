import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleTheme from './ToggleTheme';
import { ThemeContext } from '../../context/ThemeContext';
import { vi } from 'vitest';

describe('ToggleTheme component', () => {
  const mockSetTheme = vi.fn();

  test('renders with light theme', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'light', setTheme: mockSetTheme }}>
        <ToggleTheme />
      </ThemeContext.Provider>,
    );
    expect(screen.getByText('Dark theme')).toBeInTheDocument();
    expect(document.body.style.backgroundColor).toBe('rgb(255, 255, 255)');
  });

  test('renders with dark theme', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: mockSetTheme }}>
        <ToggleTheme />
      </ThemeContext.Provider>,
    );
    expect(screen.getByText('Light theme')).toBeInTheDocument();
    expect(document.body.style.backgroundColor).toBe('rgb(43, 43, 43)');
  });

  test('toggles theme with button click', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'light', setTheme: mockSetTheme }}>
        <ToggleTheme />
      </ThemeContext.Provider>,
    );
    const button = screen.getByText('Dark theme');
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
