import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from '../context/ThemeContext';
import { fireEvent } from '@testing-library/react';

const TestComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <p data-testid="theme-value">{theme}</p>
      <button onClick={() => setTheme('dark')}>Dark Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  test('provides default theme value', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
  });

  test('updates theme value by clicking', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    fireEvent.click(screen.getByText('Dark Theme'));
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
  });
});
