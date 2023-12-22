import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const exampleExampleAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDealsAssociations: builder.query({
      query: () => ({
        // todo: used this id to impement all view Details cases temporarily
        url: `${END_POINTS?.DEALS_ASSOCIATION}/${'655b2b2ecd318b576d7d71e8'}`,
        method: 'GET',
      }),
      providesTags: ['DEALS_ASSOCIATION'],
    }),
    getDealsList: builder.query({
      query: (params?: any) => ({
        url: `${END_POINTS?.DEALS_LIST_VIEW}`,
        method: 'GET',
        params,
      }),
      providesTags: ['DEALS'],
    }),
  }),
});

export const { useGetDealsAssociationsQuery, useGetDealsListQuery } =
  exampleExampleAPI;
