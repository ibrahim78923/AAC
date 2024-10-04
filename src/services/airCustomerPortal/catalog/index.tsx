import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'SERVICE_CATALOG';
const TAG_TWO = 'DROPDOWN_REQUESTER';
const TAG_THREE = 'TICKETS';
export const catalogAPI: any = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getServiceCatalog: builder?.query({
      query: (getServiceCatalogCategoriesParameter: any) => ({
        url: `${END_POINTS?.CATALOG_SERVICES}`,
        method: 'GET',
        params: getServiceCatalogCategoriesParameter?.queryParam,
      }),
      providesTags: [TAG],
    }),
    getServiceCatalogCategories: builder?.query({
      query: ({ param }: any) => ({
        url: `${END_POINTS?.SERVICE_CATALOG_CATEGORIES}`,
        method: 'GET',
        params: param,
      }),
      providesTags: [TAG],
    }),
    getServiceCatalogCategoriesDetails: builder?.query({
      query: (getServiceCatalogCategoriesDetailsParameter: any) => ({
        url: `${END_POINTS?.SERVICE_CATALOG_CATEGORIES_DETAILS}`,
        method: 'GET',
        params: getServiceCatalogCategoriesDetailsParameter?.queryParam,
      }),
      providesTags: [TAG],
    }),
    getRequesterDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_REQUESTERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
      providesTags: [TAG_TWO],
    }),
    postTickets: builder?.mutation({
      query: (postTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'POST',
        body: postTicketParameter?.body,
      }),
      invalidatesTags: [TAG_THREE],
    }),
    updateTicketsApprovalCustomerPortal: builder?.mutation({
      query: (patchApprovalTicketsParameters: any) => ({
        url: END_POINTS?.UPDATE_APPROVAL_TICKETS,
        method: 'PATCH',
        params: patchApprovalTicketsParameters?.queryParams,
        body: patchApprovalTicketsParameters?.body,
      }),
      invalidatesTags: [TAG_THREE],
    }),
    getCustomerPortalCatalogTicketApprovalDetailsById: builder?.query({
      query: (getTicketApprovalDetailsParameter: any) => ({
        url: `${END_POINTS?.GET_TICKET_APPROVAL_DETAILS}`,
        method: 'GET',
        params: getTicketApprovalDetailsParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getCustomerPortalCatalogPendingForApprovalsTickets: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_TICKETS_PENDING_FOR_APPROVAL}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getCustomerPortalCatalogTicketDetailsById: builder?.query({
      query: (getTicketDetailsParameter: any) => ({
        url: `${END_POINTS?.TICKET}/${getTicketDetailsParameter?.pathParams?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getCustomerPortalCatalogApprovalTicketsById: builder?.query({
      query: (getSingleTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}/${getSingleTicketParameter?.pathParam?.ticketId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  useGetServiceCatalogQuery,
  useGetServiceCatalogCategoriesQuery,
  useGetServiceCatalogCategoriesDetailsQuery,
  useLazyGetRequesterDropdownQuery,
  usePostTicketsMutation,
  useUpdateTicketsApprovalCustomerPortalMutation,
  useGetCustomerPortalCatalogApprovalTicketsByIdQuery,
  useGetCustomerPortalCatalogTicketApprovalDetailsByIdQuery,
  useGetCustomerPortalCatalogTicketDetailsByIdQuery,
  useGetCustomerPortalCatalogPendingForApprovalsTicketsQuery,
} = catalogAPI;
