import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DetailsContext, DetailsProvider } from './DetailsContext';

export interface ItemsContextType {
  selectedItems: string[];
  isLoading: boolean;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  toggleSelectedItem: (id: string) => void;
  unselectAllItems: () => void;
}

export const ItemsContext = createContext<ItemsContextType | undefined>(
  undefined,
);

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleSelectedItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const unselectAllItems = () => {
    setSelectedItems([]);
  };

  return (
    <ItemsContext.Provider
      value={{
        selectedItems,
        isLoading,
        error,
        setIsLoading,
        setError,
        toggleSelectedItem,
        unselectAllItems,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export const useCombinedContext = () => {
  const itemsContext = useContext(ItemsContext);
  const detailsContext = useContext(DetailsContext);

  if (!itemsContext || !detailsContext) {
    throw new Error(
      'useCombinedContext must be used within a CombinedProvider',
    );
  }

  return {
    ...itemsContext,
    ...detailsContext,
  };
};

const CombinedProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ItemsProvider>
      <DetailsProvider>{children}</DetailsProvider>
    </ItemsProvider>
  );
};

export default CombinedProvider;
