import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

export const CommonAPIS = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: END_POINTS?.PRODUCTS,
        method: 'GET',
      }),
      providesTags: ['PRODUCTS'],
    }),
    getOrganizations: builder.query({
      query: () => ({
        url: END_POINTS?.ORGANIZATIONS,
        method: 'GET',
      }),
      providesTags: ['PRODUCTS'],
    }),
  }),
});

export const { useGetProductsQuery, useGetOrganizationsQuery } = CommonAPIS;
