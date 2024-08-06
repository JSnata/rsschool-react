import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, beforeEach, vi } from 'vitest';
import Search from './Search';
import * as useSearchQuery from '../../customHooks/useSearchQuery';

const mockUseSearchQuery = vi.fn();

describe('Search component', () => {
  let searchQueryMock: [string, (value: string) => void];

  beforeEach(() => {
    searchQueryMock = ['init', vi.fn()];
    mockUseSearchQuery.mockReturnValue(searchQueryMock);

    vi.spyOn(useSearchQuery, 'default').mockImplementation(mockUseSearchQuery);
  });

  test('contains input and button', () => {
    render(<Search searchHandler={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('calls searchHandler and upd searchQuery with submitting', () => {
    const searchHandlerMock = vi.fn();
    render(<Search searchHandler={searchHandlerMock} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'searchValue' } });
    fireEvent.click(button);

    expect(searchHandlerMock).toHaveBeenCalledWith('searchValue');
    expect(searchQueryMock[1]).toHaveBeenCalledWith('searchValue');
  });
});
