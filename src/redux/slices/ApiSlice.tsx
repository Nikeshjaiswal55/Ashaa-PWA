// src/redux/slices/ApiSlice.tsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://172.26.32.1:3000/' }),
  endpoints: (build) => ({
    //------------------------------------------------------------------------------get------------------------------------------------------------------------------------------------------
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
    getDistrictByState: build.query({
      query: (stateId) => `district/by-state/${stateId}`,
    }),
    getTehsilByDistrict: build.query({
      query: (districtId) => `tehsil/by-district/${districtId}`,
    }),
    getPesticides: build.query({
      query: () => 'pesticide',
    }),
    getApplicationName: build.query({
      query: () => 'application-name',
    }),

    getProfileData: build.query({
      query: () => ({
        url: 'userProfile', // change this to your actual endpoint
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),

    //------------------------------------------------------------------------------post-------------------------------------------------------------------------------------

    //login
    login: build.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials, // { email, password }
      }),
    }),

    //change paasward
    changePassword: build.mutation({
      query: (body) => ({
        url: 'change-password',
        method: 'PATCH',
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
  }),
});

export const {
  useGetLivestockNamesQuery,
  useGetStorageListQuery,
  useGetFertilizerQuery,
  useGetEquipementQuery,
  useGetStateQuery,
  useGetPesticidesQuery,
  useGetApplicationNameQuery,
  useLoginMutation,
  useChangePasswordMutation,
  useGetProfileDataQuery,
  useGetDistrictByStateQuery,
  useGetTehsilByDistrictQuery,
} = ApiSlice;
export default ApiSlice;
