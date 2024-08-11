import React, { createContext, ReactNode } from 'react';
import { ItemsContextType } from './ItemsContext';

export const MockItemsContext = createContext<ItemsContextType | undefined>(
  undefined,
);

interface MockItemsProviderProps {
  children: ReactNode;
  value: ItemsContextType;
}

export const MockItemsProvider = ({
  children,
  value,
}: MockItemsProviderProps) => {
  return (
    <MockItemsContext.Provider value={value}>
      {children}
    </MockItemsContext.Provider>
  );
};
