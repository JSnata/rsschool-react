import { NextRouter } from 'next/router';

export const buildQueryParams = (
  page: string,
  search?: string,
): { page: string; search?: string } => {
  const queryParams: { page: string; search?: string } = { page };

  if (search && search.trim() !== '') {
    queryParams.search = search;
  }

  return queryParams;
};

export const navigateWithQueryParams = (
  router: NextRouter,
  page: string,
  search?: string,
) => {
  const queryParams = buildQueryParams(page, search);
  router.push({
    pathname: '/',
    query: queryParams,
  });
};
