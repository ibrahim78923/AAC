import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKET_ASSOCIATION';

export const ticketsAssociationAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    // Associate Assets
    getTicketsAssociatesAssets: builder?.query({
      query: (getTicketsAssociatesAssetsParameter: any) => ({
        url: END_POINTS?.TICKETS_ASSOCIATES_ASSETS,
        method: 'GET',
        params: getTicketsAssociatesAssetsParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    postTicketsAssociatesAssets: builder?.mutation({
      query: (postTicketsAssociatesAssetsParameter: any) => ({
        url: END_POINTS?.TICKETS_ASSOCIATES_ASSETS,
        method: 'POST',
        body: postTicketsAssociatesAssetsParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getAssociatesAssets: builder?.query({
      query: (postTicketsAssociatesAssetsParameter: any) => ({
        url: END_POINTS?.INVENTORY_ACTIVITY,
        method: 'GET',
        params: postTicketsAssociatesAssetsParameter?.queryParams,
      }),
    }),
    deleteTicketsAssociatesAssets: builder?.mutation({
      query: (deleteTicketsAssociatesAssetsParameter: any) => ({
        url: END_POINTS?.TICKETS_DETACH_ASSOCIATES_ASSETS,
        method: 'DELETE',
        params: deleteTicketsAssociatesAssetsParameter?.queryParams,
      }),
    }),

    // Associate Purchase Order
    getAssociatesOrder: builder?.query({
      query: (postTicketsAssociatesOrderParameter: any) => ({
        url: END_POINTS?.PURCHASE_ORDER_LIST,
        method: 'GET',
        params: postTicketsAssociatesOrderParameter?.queryParams,
      }),
    }),

    // Associate Deals
    getTicketsAssociatesDeals: builder?.query({
      query: (getTicketsAssociatesDealsParameter: any) => ({
        url: END_POINTS?.TICKET,
        method: 'GET',
        params: getTicketsAssociatesDealsParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getAssociatesDeals: builder?.query({
      query: (postTicketsAssociatesDealsParameter: any) => ({
        url: END_POINTS?.DEALS_LIST_VIEW,
        method: 'GET',
        params: postTicketsAssociatesDealsParameter?.queryParams,
      }),
    }),

    // Associate Contacts
    getTicketsAssociatesContacts: builder?.query({
      query: (getTicketsAssociatesContactsParameter: any) => ({
        url: END_POINTS?.TICKET,
        method: 'GET',
        params: getTicketsAssociatesContactsParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getAssociatesContacts: builder?.query({
      query: (postTicketsAssociatesContactsParameter: any) => ({
        url: END_POINTS?.CONTACTS,
        method: 'GET',
        params: postTicketsAssociatesContactsParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  useGetTicketsAssociatesAssetsQuery,
  useGetAssociatesAssetsQuery,
  usePostTicketsAssociatesAssetsMutation,
  useDeleteTicketsAssociatesAssetsMutation,
  useLazyGetTicketsAssociatesAssetsQuery,
  useGetAssociatesOrderQuery,
  useLazyGetTicketsAssociatesDealsQuery,
  useGetAssociatesDealsQuery,
  useLazyGetTicketsAssociatesContactsQuery,
  useGetAssociatesContactsQuery,
} = ticketsAssociationAPI;
