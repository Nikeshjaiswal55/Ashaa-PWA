// src/redux/slices/ApiSlice.tsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.42:3000/' }),
  endpoints: (build) => ({
    getLivestockNames: build.query({
      query: () => 'livestock-name',
    }),
    getStorageList: build.query({
      query: () => 'storage',
    }),
    getFertilizer: build.query({
      query: () => 'fertilizer',
    }),
    getEquipement: build.query({
      query: () => 'equipement',
    }),
    getState: build.query({
      query: () => 'state',
    }),
    getDistrict: build.query({
      query: () => 'district',
    }),
    getPesticides: build.query({
      query: () => 'pesticide',
    }),
    getApplicationName: build.query({
      query: () => 'application-name',
    }),
  }),
});

export const {
  useGetLivestockNamesQuery,
  useGetStorageListQuery,
  useGetFertilizerQuery,
  useGetEquipementQuery,
  useGetStateQuery,
  useGetDistrictQuery,
  useGetPesticidesQuery,
  useGetApplicationNameQuery,
} = ApiSlice;
export default ApiSlice;
