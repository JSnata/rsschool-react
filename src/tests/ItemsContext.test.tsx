import React from 'react';
import { render, screen } from '@testing-library/react';
import CombinedProvider, { useCombinedContext } from '../context/ItemsContext';
import { fireEvent } from '@testing-library/react';

const TestComponent = () => {
  const {
    selectedItems,
    toggleSelectedItem,
    unselectAllItems,
    detailsOpened,
    showDetails,
    hideDetails,
  } = useCombinedContext();

  return (
    <div>
      <p data-testid="status">{detailsOpened ? 'Open' : 'Closed'}</p>
      <button onClick={() => showDetails('1')}>Show</button>
      <button onClick={() => hideDetails()}>Hide</button>

      <p data-testid="selected">{selectedItems.join(', ')}</p>
      <button onClick={() => unselectAllItems()}>Unselect All</button>
      <button onClick={() => toggleSelectedItem('item')}>Toggle Item</button>
    </div>
  );
};

describe('CombinedProvider', () => {
  test('updates state', () => {
    render(
      <CombinedProvider>
        <TestComponent />
      </CombinedProvider>,
    );

    expect(screen.getByTestId('status')).toHaveTextContent('Closed');

    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByTestId('status')).toHaveTextContent('Open');

    fireEvent.click(screen.getByText('Hide'));
    expect(screen.getByTestId('status')).toHaveTextContent('Closed');

    fireEvent.click(screen.getByText('Toggle Item'));
    expect(screen.getByTestId('selected')).toHaveTextContent('item');

    fireEvent.click(screen.getByText('Unselect All'));
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
  });

  test('throws error when useCombinedContext is used outside of CombinedProvider', () => {
    const renderOutsideProvider = () => {
      const TestComponentOutsideProvider = () => {
        useCombinedContext();
        return null;
      };

      render(<TestComponentOutsideProvider />);
    };
    expect(renderOutsideProvider).toThrow(
      'useCombinedContext must be used within a CombinedProvider',
    );
  });
});
