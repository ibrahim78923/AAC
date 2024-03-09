import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKETS';
const TAG_TWO = 'DROPDOWN_REQUESTER';
const TAG_THREE = 'DROPDOWN_AGENT';
const TAG_FOUR = 'DROPDOWN_DEPARTMENT';
const TAG_FIVE = 'DROPDOWN_ASSOCIATE_ASSET';
const TAG_SIX = 'DROPDOWN_CATEGORIES';

export const ticketsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getTicketsById: builder?.query({
      query: (getSingleTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}/${getSingleTicketParameter?.pathParam?.ticketId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getExportTickets: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
      providesTags: [TAG],
    }),
    postTickets: builder?.mutation({
      query: (postTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'POST',
        body: postTicketParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    putTickets: builder?.mutation({
      query: (putTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}/{id}`,
        method: 'PUT',
        body: putTicketParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    putSingleTicketStatus: builder?.mutation({
      query: (putSingleTicketStatusParameter: any) => ({
        url: `${END_POINTS?.TICKET_STATUS}/${putSingleTicketStatusParameter?.pathParams?.id}`,
        method: 'PUT',
        params: putSingleTicketStatusParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    patchBulkUpdateTickets: builder?.mutation({
      query: (patchBulkUpdateTicketsParameter: any) => ({
        url: `${END_POINTS?.TICKET_BULK_UPDATE}`,
        method: 'PATCH',
        params: patchBulkUpdateTicketsParameter?.queryParams,
        body: patchBulkUpdateTicketsParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteTickets: builder?.mutation({
      query: (deleteTicketsParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'DELETE',
        params: deleteTicketsParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
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
    getAgentDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_AGENTS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
      providesTags: [TAG_THREE],
    }),
    getDepartmentDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_DEPARTMENT}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.departments;
      },
      providesTags: [TAG_FOUR],
    }),
    getAssociateAssetsDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_ASSOCIATE_ASSET}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.inventories;
      },
      providesTags: [TAG_FIVE],
    }),
    getCategoriesDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_CATEGORIES}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.servicecategories;
      },
      providesTags: [TAG_SIX],
    }),
    getTicketByRequester: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_TICKET_BY_REQUESTER}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_THREE],
    }),
    getTicketBySubject: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_TICKET_BY_SUBJECT}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response)
          return Object?.keys(response?.data)?.length ? [response?.data] : [];
      },
      providesTags: [TAG_THREE],
    }),
    getTicketsSearchById: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.TICKET}/${params?.ticketId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    postMergeTickets: builder?.mutation({
      query: (postMergeTicketParameter: any) => ({
        url: `${END_POINTS?.MERGE_TICKET}`,
        method: 'POST',
        params: postMergeTicketParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  usePostTicketsMutation,
  useGetTicketsQuery,
  useDeleteTicketsMutation,
  useGetTicketsByIdQuery,
  usePutTicketsMutation,
  useLazyGetTicketsQuery,
  useLazyGetExportTicketsQuery,
  usePatchBulkUpdateTicketsMutation,
  useLazyGetRequesterDropdownQuery,
  useLazyGetAgentDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetAssociateAssetsDropdownQuery,
  useLazyGetCategoriesDropdownQuery,
  usePutSingleTicketStatusMutation,
  useLazyGetTicketByRequesterQuery,
  useLazyGetTicketBySubjectQuery,
  useLazyGetTicketsSearchByIdQuery,
  usePostMergeTicketsMutation,
} = ticketsAPI;
