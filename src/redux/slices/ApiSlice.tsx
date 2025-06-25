// src/redux/slices/ApiSlice.tsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.42:3000/' }),
  endpoints: (build) => ({
    getLivestockNames: build.query({
      query: () => 'livestock-name',
    }),
  }),
});

export const { useGetLivestockNamesQuery } = ApiSlice;
export default ApiSlice;
