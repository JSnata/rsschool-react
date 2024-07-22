import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { People, PeopleResponse } from '../types/types';

export const itemsAPI = createApi({
  reducerPath: 'itemsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    fetchPeople: builder.query<
      PeopleResponse,
      { page: number; search?: string }
    >({
      query: ({ page, search }) => ({
        url: 'people/',
        params: { page, search },
      }),
    }),
    fetchPersonById: builder.query<People, string | undefined>({
      query: (id) => `people/${id}/`,
    }),
  }),
});
