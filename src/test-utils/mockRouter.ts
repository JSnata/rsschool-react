import { NextRouter } from 'next/router';
import { vi } from 'vitest';

export function createMockrouter(
  overrides: Partial<NextRouter> = {},
): NextRouter {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    push: vi.fn().mockImplementation((url) => {
      if (typeof url === 'object') {
        const { pathname, query } = url;
        const queryString = new URLSearchParams(query).toString();
        window.history.pushState({}, '', `${pathname}?${queryString}`);
      } else {
        window.history.pushState({}, '', url);
      }
    }),
    replace: vi.fn().mockResolvedValue(true),
    reload: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn().mockResolvedValue(undefined),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
    isReady: true,
    isPreview: false,
    defaultLocale: 'en',
    domainLocales: [],
    isLocaleDomain: false,
    ...overrides,
  };
}
