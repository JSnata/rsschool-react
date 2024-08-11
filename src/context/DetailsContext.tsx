import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DetailsContextType {
  detailsOpened: boolean;
  showDetails: (id: string) => void;
  hideDetails: () => void;
}

export const DetailsContext = createContext<DetailsContextType | undefined>(
  undefined,
);

export const useDetails = () => {
  const context = useContext(DetailsContext);
  if (!context) {
    throw new Error('useDetails must be used within a DetailsProvider');
  }
  return context;
};

export const DetailsProvider = ({ children }: { children: ReactNode }) => {
  const [detailsOpened, setDetailsOpened] = useState(false);

  const showDetails = () => {
    setDetailsOpened(true);
  };

  const hideDetails = () => {
    setDetailsOpened(false);
  };

  return (
    <DetailsContext.Provider
      value={{ detailsOpened, showDetails, hideDetails }}
    >
      {children}
    </DetailsContext.Provider>
  );
};
