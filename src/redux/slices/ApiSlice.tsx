// src/redux/slices/ApiSlice.tsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.42:3000/' }), //http://192.168.1.45:3000/
  endpoints: (build) => ({
    //------------------------------------------------------------------------------get------------------------------------------------------------------------------------------------------
    getLivestockNames: build.query({
      query: () => 'livestock-name',
    }),
    getBreedNamesbyLiveStock: build.query({
      query: (LivestockNamesId) => `/livestock-name/breed/by-livestock/${LivestockNamesId}`,
    }),
    getStorageList: build.query({
      query: () => 'storage',
    }),
    getFertilizer: build.query({
      query: () => 'fertilizer',
    }),
    getBreedNamesbyFertilizer: build.query({
      query: (fertilizerNamesId) => `fertilizer/brand/by-fertilizer/${fertilizerNamesId}`,
    }),
    getEquipement: build.query({
      query: () => 'equipement',
    }),
    getBreedNamesbyEquipement: build.query({
      query: (equipementNamesId) => `equipement-brand/by-equipment/${equipementNamesId}`,
    }),
    getPesticides: build.query({
      query: () => 'pesticide',
    }),
    getBreedNamesbyPesticides: build.query({
      query: (PesticidesNamesId) => `/pesticide/brand/by-pesticide/${PesticidesNamesId}`,
    }),
    getApplicationName: build.query({
      query: () => 'application-name',
    }),

    // getState: build.query({
    //   query: () => 'state',
    // }),
    // getDistrictByState: build.query({
    //   query: (stateId) => `district/by-state/${stateId}`,
    // }),
    // getTehsilByDistrict: build.query({
    //   query: (districtId) => `tehsil/by-district/${districtId}`,
    // }),
    // getVillagesByTehsil: build.query({
    //   query: (tehsilId) => `village/by-tehsil/${tehsilId}`,
    // }),

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

    // Save all farmer data (multi-step form)
    saveFarmerAll: build.mutation({
      query: (body) => ({
        url: 'farmer/save-all',
        method: 'POST',
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
  useGetPesticidesQuery,
  useGetApplicationNameQuery,
  useLoginMutation,
  useChangePasswordMutation,
  useGetProfileDataQuery,
  useGetBreedNamesbyLiveStockQuery,
  useGetBreedNamesbyEquipementQuery,
  useGetBreedNamesbyFertilizerQuery,
  useGetBreedNamesbyPesticidesQuery,
  useSaveFarmerAllMutation,
} = ApiSlice;
export default ApiSlice;
