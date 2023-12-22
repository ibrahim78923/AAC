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
    getDealsListView: builder.query({
      query: () => ({
        // todo: used this id to impement all view Details cases temporarily
        url: `/deals/get-deals-list-view`,
        method: 'GET',
      }),
      providesTags: ['DEALS_ASSOCIATION'],
    }),
  }),
});

export const { useGetDealsAssociationsQuery, useGetDealsListViewQuery } =
  exampleExampleAPI;
