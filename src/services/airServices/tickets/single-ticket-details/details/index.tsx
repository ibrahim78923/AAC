import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKET_DETAILS';
const TAG_THREE = 'DROPDOWN_AGENT';
const TAG_SIX = 'DROPDOWN_CATEGORIES';
const TAG_TWO = 'WORKLOAD';

const ticketsDetailsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getTicketsDetailsById: builder?.query({
      query: (getSingleTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET_DETAILS}/${getSingleTicketParameter?.pathParam?.ticketId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
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
    putTickets: builder?.mutation({
      query: (putTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}/{id}`,
        method: 'PUT',
        body: putTicketParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    postTicketsTime: builder?.mutation({
      query: (postTicketTimeParameter: any) => ({
        url: `${END_POINTS?.TICKET_TIME_ENTRIES}`,
        method: 'POST',
        body: postTicketTimeParameter?.body,
      }),
    }),
    getTaskByIdDropDown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.WORKLOAD}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.title;
      },
      providesTags: [TAG_TWO],
    }),
    getTicketsTimeEntriesById: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET_TIME_LIST}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  useGetTicketsDetailsByIdQuery,
  useLazyGetTicketsDetailsByIdQuery,
  useLazyGetAgentDropdownQuery,
  usePutTicketsMutation,
  useLazyGetCategoriesDropdownQuery,
  usePostTicketsTimeMutation,
  useLazyGetTaskByIdDropDownQuery,
  useGetTicketsTimeEntriesByIdQuery,
} = ticketsDetailsAPI;
