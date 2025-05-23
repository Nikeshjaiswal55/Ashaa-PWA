import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/todos' }),
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => ``,
    }),
  }),
});

export const { useGetTodosQuery } = ApiSlice;
export default ApiSlice;
