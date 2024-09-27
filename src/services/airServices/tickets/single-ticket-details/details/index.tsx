import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKET_DETAILS';
const TAG_TIME_ENTRIES = 'TICKET_TIME_ENTRIES';

const ticketsDetailsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getSingleServicesTicketsDetailsForEditById: builder?.query({
      query: (getSingleTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET_DETAILS}/${getSingleTicketParameter?.pathParam?.ticketId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    addSingleServicesTicketsTasksTime: builder?.mutation({
      query: (postTicketTimeParameter: any) => ({
        url: `${END_POINTS?.TICKET_TIME_ENTRIES}`,
        method: 'POST',
        body: postTicketTimeParameter?.body,
      }),
      invalidatesTags: [TAG_TIME_ENTRIES],
    }),
    getSingleServicesTicketsTaskListDropDown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_TASK}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getSingleServicesTicketsTimeEntriesList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET_TIME_LIST}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG_TIME_ENTRIES],
    }),
    updateSingleServicesTicketsTasksTime: builder?.mutation({
      query: (putTicketTimeParameter: any) => ({
        url: `${END_POINTS?.TICKET_UPDATE_TIME_ENTRIES}`,
        method: 'PATCH',
        body: putTicketTimeParameter?.body,
      }),
      invalidatesTags: [TAG_TIME_ENTRIES],
    }),
    editSingleServicesTicketsDetailsById: builder?.mutation({
      query: (putTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}/{id}`,
        method: 'PUT',
        body: putTicketParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getServiceTicketsCatalogCategoriesDropdownList: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.SERVICES_CATEGORIES}`,
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
  useGetSingleServicesTicketsDetailsForEditByIdQuery,
  useAddSingleServicesTicketsTasksTimeMutation,
  useUpdateSingleServicesTicketsTasksTimeMutation,
  useLazyGetSingleServicesTicketsTaskListDropDownQuery,
  useGetSingleServicesTicketsTimeEntriesListQuery,
  useLazyGetServiceTicketsCatalogCategoriesDropdownListQuery,
  useEditSingleServicesTicketsDetailsByIdMutation,
} = ticketsDetailsAPI;
