import React from 'react';
import { render, screen } from '@testing-library/react';
import Custom404 from './404';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockrouter } from '../test-utils/mockRouter';

describe('404 component', () => {
  test('renders the 404 page with correct text', () => {
    render(
      <RouterContext.Provider value={createMockrouter({})}>
        <Custom404 />
      </RouterContext.Provider>,
    );

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  test('renders "Go Back" button', () => {
    render(
      <RouterContext.Provider value={createMockrouter({})}>
        <Custom404 />
      </RouterContext.Provider>,
    );

    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });
});
