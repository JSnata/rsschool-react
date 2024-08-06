import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Pagination from './Pagination';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockrouter } from '../../test-utils/mockRouter';
import CombinedProvider from '../../context/ItemsContext';
import { MockItemsProvider } from '../../context/MockItemsContext';
import { vi } from 'vitest';

export const defaultContextValue = {
  selectedItems: ['1'],
  isLoading: false,
  error: '',
  setIsLoading: vi.fn(),
  setError: vi.fn(),
  toggleSelectedItem: vi.fn(),
  unselectAllItems: vi.fn(),
};

describe('Pagination component', () => {
  test('updates URL query parameter when page changes', async () => {
    render(
      <RouterContext.Provider value={createMockrouter({})}>
        <CombinedProvider>
          <MockItemsProvider value={defaultContextValue}>
            <Pagination totalItemsCount={100} currentPage={1} />
          </MockItemsProvider>
        </CombinedProvider>
      </RouterContext.Provider>,
    );

    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    await waitFor(() => {
      console.log('Location: ', window.location.pathname);

      expect(window.location.href).toContain('page=2');
    });
  });
});
