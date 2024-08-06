import { createContext } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

export const defaultThemeContextValue: ThemeContextType = {
  theme: 'light',
  setTheme: () => {},
};

export const MockThemeContext = createContext<ThemeContextType>(
  defaultThemeContextValue,
);
