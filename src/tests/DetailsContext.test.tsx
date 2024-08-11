import React from 'react';
import { render, screen } from '@testing-library/react';
import { DetailsProvider, useDetails } from '../context/DetailsContext';
import { fireEvent } from '@testing-library/react';

const TestComponent = () => {
  const { detailsOpened, showDetails, hideDetails } = useDetails();

  return (
    <div>
      <p data-testid="status">{detailsOpened ? 'Open' : 'Closed'}</p>
      <button onClick={() => showDetails('1')}>Show</button>
      <button onClick={() => hideDetails()}>Close</button>
    </div>
  );
};

describe('DetailsProvider', () => {
  test('updates state when showDetails and hideDetails are called', () => {
    render(
      <DetailsProvider>
        <TestComponent />
      </DetailsProvider>,
    );

    expect(screen.getByTestId('status')).toHaveTextContent('Closed');
    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByTestId('status')).toHaveTextContent('Open');
    fireEvent.click(screen.getByText('Close'));
    expect(screen.getByTestId('status')).toHaveTextContent('Closed');
  });
});
