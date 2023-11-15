import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'DROPDOWNS';

const transformResponse = (response: any) => {
  if (response) return response?.data;
};

export const dropdownsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query({
      query: () => ({
        url: `${END_POINTS?.DROPDOWN_ORGANIZATIONS}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: [TAG],
    }),

    getProducts: builder.query({
      query: () => ({
        url: `${END_POINTS?.DROPDOWN_PRODUCTS}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: [TAG],
    }),
  }),
});

export const { useLazyGetOrganizationsQuery, useLazyGetProductsQuery } =
  dropdownsAPI;
