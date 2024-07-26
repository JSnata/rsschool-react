import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, beforeEach, vi } from 'vitest';
import Search from './Search';
import * as useSearchQuery from '../customHooks/useSearchQuery';

const mockUseSearchQuery = vi.fn();

describe('Search component', () => {
  let searchQueryMock: [string, (value: string) => void];

  beforeEach(() => {
    searchQueryMock = ['init', vi.fn()];
    mockUseSearchQuery.mockReturnValue(searchQueryMock);

    vi.spyOn(useSearchQuery, 'default').mockImplementation(mockUseSearchQuery);
  });

  test('updates input value on change', () => {
    render(<Search searchHandler={vi.fn()} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'newValue' } });
    expect(searchQueryMock[1]).toHaveBeenCalledWith('newValue');
  });

  test('contains input and button', () => {
    render(<Search searchHandler={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
