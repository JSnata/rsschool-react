import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, vi } from 'vitest';
import ErrorPage from '../pages/404';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useRouteError: vi.fn(),
    isRouteErrorResponse: vi.fn(),
  };
});

import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from 'react-router-dom';

const mockedUseNavigate = vi.mocked(useNavigate);
const mockedUseRouteError = vi.mocked(useRouteError);
const mockedIsRouteErrorResponse = vi.mocked(isRouteErrorResponse);

describe('ErrorPage', () => {
  test('renders error message correctly', () => {
    mockedUseRouteError.mockReturnValue({
      status: 404,
      statusText: 'Not Found',
    });
    mockedIsRouteErrorResponse.mockImplementation(
      (error) => error.status === 404,
    );

    render(
      <Router>
        <ErrorPage />
      </Router>,
    );

    expect(screen.getByText('404 page not found')).toBeInTheDocument();
  });

  test('calls navigate function when Go Back button is clicked', () => {
    const navigate = vi.fn();
    mockedUseNavigate.mockReturnValue(navigate);
    mockedUseRouteError.mockReturnValue({
      status: 404,
      statusText: 'Not Found',
    });
    mockedIsRouteErrorResponse.mockImplementation(
      (error) => error.status === 404,
    );

    render(
      <Router>
        <ErrorPage />
      </Router>,
    );

    fireEvent.click(screen.getByText('Go Back'));
    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
