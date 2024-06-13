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
      providesTags: [TAG],
    }),

    // Associate Purchase Order
    getAssociatesOrder: builder?.query({
      query: (postTicketsAssociatesOrderParameter: any) => ({
        url: END_POINTS?.PURCHASE_ORDER_LIST,
        method: 'GET',
        params: postTicketsAssociatesOrderParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),

    // Associate Deals
    getAssociatesDeals: builder?.query({
      query: (postTicketsAssociatesDealsParameter: any) => ({
        url: END_POINTS?.DEALS_LIST_VIEW,
        method: 'GET',
        params: postTicketsAssociatesDealsParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),

    // Associate Contacts
    getAssociatesContacts: builder?.query({
      query: (postTicketsAssociatesContactsParameter: any) => ({
        url: END_POINTS?.CONTACTS,
        method: 'GET',
        params: postTicketsAssociatesContactsParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getContactOwner: builder.query({
      query: () => ({
        url: END_POINTS?.CONTACTS,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.contacts;
      },
      providesTags: [TAG],
    }),
    getLifeCycleStage: builder.query({
      query: ({ params }) => ({
        url: END_POINTS?.LIFECYCLE_STAGES,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.lifecycleStages;
      },
      providesTags: [TAG],
    }),
    getStatus: builder.query({
      query: ({ params }) => ({
        url: END_POINTS?.CONTACT_STATUS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.conatactStatus;
      },
      providesTags: [TAG],
    }),
    postContact: builder?.mutation({
      query: (body: any) => ({
        url: END_POINTS?.CONTACTS,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getContactById: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.CONTACTS}/${params?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),

    // Associate Companies
    postCompany: builder?.mutation({
      query: (body: any) => ({
        url: END_POINTS?.COMPANY,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getAssociatesCompany: builder?.query({
      query: (postTicketsAssociatesCompanyParameter: any) => ({
        url: END_POINTS?.COMPANY,
        method: 'GET',
        params: postTicketsAssociatesCompanyParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getCompanyById: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.COMPANY_PREVIEW}/${params?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
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
  useLazyGetContactOwnerQuery,
  useLazyGetLifeCycleStageQuery,
  useLazyGetStatusQuery,
  usePostContactMutation,
  useGetContactByIdQuery,
  usePostCompanyMutation,
  useGetAssociatesCompanyQuery,
  useGetCompanyByIdQuery,
} = ticketsAssociationAPI;
