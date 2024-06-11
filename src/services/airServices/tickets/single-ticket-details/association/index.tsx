import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKET_ASSOCIATION';

export const ticketsAssociationAPI: any = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    // Generic Post, Detach and GET
    postRemoveAssociateTickets: builder?.mutation({
      query: (postRemoveAssociateTicketsParameter: any) => ({
        url: END_POINTS?.TICKETS_ASSOCIATES,
        method: 'POST',
        body: postRemoveAssociateTicketsParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getAssociateTickets: builder?.query({
      query: (associateTicketsParameter: any) => ({
        url: END_POINTS?.TICKETS_ASSOCIATES_GET,
        method: 'GET',
        params: associateTicketsParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),

    // Associate Assets
    getAssociatesAssets: builder?.query({
      query: (postTicketsAssociatesAssetsParameter: any) => ({
        url: END_POINTS?.INVENTORY_ACTIVITY,
        method: 'GET',
        params: postTicketsAssociatesAssetsParameter?.queryParams,
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
    getAssociatesDeals: builder?.query({
      query: (postTicketsAssociatesDealsParameter: any) => ({
        url: END_POINTS?.DEALS_LIST_VIEW,
        method: 'GET',
        params: postTicketsAssociatesDealsParameter?.queryParams,
      }),
    }),

    // Associate Contacts
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
  usePostRemoveAssociateTicketsMutation,
  useGetAssociateTicketsQuery,
  useGetAssociatesAssetsQuery,
  useGetAssociatesOrderQuery,
  useGetAssociatesDealsQuery,
  useGetAssociatesContactsQuery,
} = ticketsAssociationAPI;
