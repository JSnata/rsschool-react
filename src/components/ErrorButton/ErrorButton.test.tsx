import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, beforeEach, vi } from 'vitest';
import ErrorButton from './ErrorButton';
import ErrorBoundary from '../ErrorBoundary';

describe('ErrorButton сomponent', () => {
  const consoleError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = consoleError;
  });

  test('renders correctly', () => {
    render(<ErrorButton />);
    expect(
      screen.getByRole('button', { name: 'New Error!' }),
    ).toBeInTheDocument();
  });

  test('throws an error when button is clicked', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'New Error!' }));
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });
});
