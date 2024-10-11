import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKETS';

export const ticketsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getServicesTicketsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getServicesTicketsListAsExport: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
      providesTags: [TAG],
    }),
    getServicesSingleTicketDetailById: builder?.query({
      query: (getSingleTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}/${getSingleTicketParameter?.pathParam?.ticketId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    addSingleServicesTicket: builder?.mutation({
      query: (postTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'POST',
        body: postTicketParameter?.body,
      }),
    }),
    updateSingleServicesTicketById: builder?.mutation({
      query: (putTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}/{id}`,
        method: 'PUT',
        body: putTicketParameter?.body,
      }),
    }),
    updateSingleServicesTicketStatus: builder?.mutation({
      query: (putSingleTicketStatusParameter: any) => ({
        url: `${END_POINTS?.TICKET_STATUS}`,
        method: 'PUT',
        params: putSingleTicketStatusParameter?.queryParams,
      }),
    }),
    updateBulkServicesTickets: builder?.mutation({
      query: (patchBulkUpdateTicketsParameter: any) => ({
        url: `${END_POINTS?.TICKET_BULK_UPDATE}`,
        method: 'PATCH',
        params: patchBulkUpdateTicketsParameter?.queryParams,
        body: patchBulkUpdateTicketsParameter?.body,
      }),
    }),
    deleteMultipleServicesTickets: builder?.mutation({
      query: (deleteTicketsParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'DELETE',
        params: deleteTicketsParameter?.queryParams,
      }),
    }),
    mergeServicesTickets: builder?.mutation({
      query: (postMergeTicketParameter: any) => ({
        url: `${END_POINTS?.MERGE_TICKET}`,
        method: 'POST',
        params: postMergeTicketParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    findServicesTicketByRequester: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_TICKET_BY_REQUESTER}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    findServicesTicketBySubject: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_TICKET_BY_SUBJECT}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response)
          return Object?.keys(response?.data)?.length ? [response?.data] : [];
      },
    }),
    findServicesTicketsByTicketId: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.TICKET}/${params?.ticketId}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    findServicesTicketByIdForMerge: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_TICKET_BY_REQUESTER}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    sendReplyToServicesTicketsBulkUpdate: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET_NEW_EMAIL}`,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    getDepartmentDropdownForServicesTickets: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_DEPARTMENT}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.departments;
      },
    }),
    getAssociateAssetsDropdownForServicesTickets: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_ASSOCIATE_ASSET}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.inventories;
      },
    }),
    getCategoriesDropdownForServicesTickets: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_CATEGORIES}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.servicecategories;
      },
    }),
    getAllUsersAsRequestersDropdownForServicesTickets: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getAllUsersAsAgentsDropdownForServicesTickets: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
  }),
});
export const {
  useLazyGetServicesTicketsListQuery,
  useLazyGetServicesTicketsListAsExportQuery,
  useGetServicesSingleTicketDetailByIdQuery,
  useAddSingleServicesTicketMutation,
  useUpdateSingleServicesTicketByIdMutation,
  useUpdateSingleServicesTicketStatusMutation,
  useUpdateBulkServicesTicketsMutation,
  useDeleteMultipleServicesTicketsMutation,
  useMergeServicesTicketsMutation,
  useLazyFindServicesTicketByIdForMergeQuery,
  useLazyFindServicesTicketByRequesterQuery,
  useLazyFindServicesTicketBySubjectQuery,
  useLazyFindServicesTicketsByTicketIdQuery,
  useSendReplyToServicesTicketsBulkUpdateMutation,
  useLazyGetDepartmentDropdownForServicesTicketsQuery,
  useLazyGetAssociateAssetsDropdownForServicesTicketsQuery,
  useLazyGetCategoriesDropdownForServicesTicketsQuery,
  useLazyGetAllUsersAsRequestersDropdownForServicesTicketsQuery,
  useLazyGetAllUsersAsAgentsDropdownForServicesTicketsQuery,
} = ticketsAPI;
