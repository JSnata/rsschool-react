import React from 'react';
import { render, screen } from '@testing-library/react';
import RootLayout from '../app/layout';

describe('RootLayout component', () => {
  test('renders children correctly', () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  test('renders with correct HTML structure', () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );
    const htmlElement = screen.getByRole('document');
    const bodyElement = screen.getByRole('document').querySelector('body');
    expect(htmlElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
    expect(bodyElement).toContainElement(screen.getByText('Test Child'));
  });
});
