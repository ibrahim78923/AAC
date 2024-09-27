import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKET_ASSOCIATION';

export const ticketsAssociationAPI: any = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    // Generic Post, Detach and GET
    postAirServicesRemoveAssociateTickets: builder?.mutation({
      query: (postRemoveAssociateTicketsParameter: any) => ({
        url: END_POINTS?.TICKETS_ASSOCIATES,
        method: 'POST',
        body: postRemoveAssociateTicketsParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getAirServicesAssociateTickets: builder?.query({
      query: (associateTicketsParameter: any) => ({
        url: END_POINTS?.TICKETS_ASSOCIATES_GET,
        method: 'GET',
        params: associateTicketsParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),

    // Associate Assets
    getAirServicesAssociatesAssets: builder?.query({
      query: (postTicketsAssociatesAssetsParameter: any) => ({
        url: END_POINTS?.INVENTORY_ACTIVITY,
        method: 'GET',
        params: postTicketsAssociatesAssetsParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),

    // Associate Purchase Order
    getAirServicesAssociatesOrder: builder?.query({
      query: (postTicketsAssociatesOrderParameter: any) => ({
        url: END_POINTS?.PURCHASE_ORDER_LIST,
        method: 'GET',
        params: postTicketsAssociatesOrderParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),

    // Associate Deals
    getAirServicesAssociatesDeals: builder?.query({
      query: (postTicketsAssociatesDealsParameter: any) => ({
        url: END_POINTS?.DEALS_LIST_VIEW,
        method: 'GET',
        params: postTicketsAssociatesDealsParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getAirServicesDealById: builder.query({
      query: (getDealByIdParameter: any) => ({
        url: END_POINTS?.DEALS_ACTION_PREVIEW,
        method: 'GET',
        params: getDealByIdParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),

    // Associate Contacts
    getAirServicesAssociatesContacts: builder?.query({
      query: (postTicketsAssociatesContactsParameter: any) => ({
        url: END_POINTS?.CONTACTS,
        method: 'GET',
        params: postTicketsAssociatesContactsParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getAirServicesContactOwner: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.CONTACTS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.contacts;
      },
      providesTags: [TAG],
    }),
    getAirServicesLifeCycleStage: builder.query({
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
    getAirServicesAssociationStatus: builder.query({
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
    postAirServicesContact: builder?.mutation({
      query: (body: any) => ({
        url: END_POINTS?.CONTACTS,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getAirServicesTicketContactById: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.CONTACTS}/${params?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),

    // Associate Companies
    postAirServicesCompany: builder?.mutation({
      query: (body: any) => ({
        url: END_POINTS?.COMPANY,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getAirServicesAssociatesCompany: builder?.query({
      query: (postTicketsAssociatesCompanyParameter: any) => ({
        url: END_POINTS?.COMPANY,
        method: 'GET',
        params: postTicketsAssociatesCompanyParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getAirServicesCompanyById: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.COMPANY_PREVIEW}/${params?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getAirServicesContactOwnerUsersDropdown: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_ORGANIZATIONS}/${params?.orgId}/users`,
        method: 'GET',
        params: {
          search: params?.search,
        },
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
      providesTags: [TAG],
    }),

    // Inventory Association
    getServicesInventoryAssociationExitingTickets: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.TICKET,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    postServicesInventoryAssociationTickets: builder?.mutation({
      query: (postTicketParameter: any) => ({
        url: END_POINTS?.TICKET,
        method: 'POST',
        body: postTicketParameter?.body,
      }),
    }),
  }),
});

export const {
  usePostAirServicesRemoveAssociateTicketsMutation,
  useGetAirServicesAssociateTicketsQuery,
  useGetAirServicesAssociatesAssetsQuery,
  useGetAirServicesAssociatesOrderQuery,
  useGetAirServicesAssociatesDealsQuery,
  useGetAirServicesDealByIdQuery,
  useGetAirServicesAssociatesContactsQuery,
  useLazyGetAirServicesContactOwnerQuery,
  useLazyGetAirServicesLifeCycleStageQuery,
  useLazyGetAirServicesAssociationStatusQuery,
  usePostAirServicesContactMutation,
  useGetAirServicesTicketContactByIdQuery,
  usePostAirServicesCompanyMutation,
  useGetAirServicesAssociatesCompanyQuery,
  useGetAirServicesCompanyByIdQuery,
  useLazyGetAirServicesContactOwnerUsersDropdownQuery,
  useLazyGetServicesInventoryAssociationExitingTicketsQuery,
  usePostServicesInventoryAssociationTicketsMutation,
} = ticketsAssociationAPI;
