import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKET_ASSOCIATES_ASSETS';

export const ticketsAssociatesAssetsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getTicketsAssociatesAssets: builder?.query({
      query: (getTicketsAssociatesAssetsParameter: any) => ({
        url: `${END_POINTS?.TICKETS_ASSOCIATES_ASSETS}`,
        method: 'GET',
        params: getTicketsAssociatesAssetsParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    postTicketsAssociatesAssets: builder?.mutation({
      query: (postTicketsAssociatesAssetsParameter: any) => ({
        url: `${END_POINTS?.TICKETS_ASSOCIATES_ASSETS}`,
        method: 'POST',
        body: postTicketsAssociatesAssetsParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getAssociatesAssets: builder?.query({
      query: (postTicketsAssociatesAssetsParameter: any) => ({
        url: `${END_POINTS?.INVENTORY_ACTIVITY}`,
        method: 'GET',
        params: postTicketsAssociatesAssetsParameter?.queryParams,
      }),
    }),
    deleteTicketsAssociatesAssets: builder?.mutation({
      query: (deleteTicketsAssociatesAssetsParameter: any) => ({
        url: `${END_POINTS?.TICKETS_DETACH_ASSOCIATES_ASSETS}`,
        method: 'DELETE',
        params: deleteTicketsAssociatesAssetsParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  useGetTicketsAssociatesAssetsQuery,
  useGetAssociatesAssetsQuery,
  usePostTicketsAssociatesAssetsMutation,
  useDeleteTicketsAssociatesAssetsMutation,
  useLazyGetAssociatesAssetsQuery,
  useLazyGetTicketsAssociatesAssetsQuery,
} = ticketsAssociatesAssetsAPI;
