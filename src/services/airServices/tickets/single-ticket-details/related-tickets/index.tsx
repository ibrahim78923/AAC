import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'RELATED_TICKETS';
const {
  ADD_CHILD_TICKET,
  GET_CHILD_TICKETS,
  DELETE_CHILD_TICKET,
  REQUESTER_LIST,
  SERVICES_CATEGORIES,
  DEPARTMENT_LIST,
} = END_POINTS;
export const relatedTicketsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getChildTickets: builder?.query({
      query: ({ id, ...params }) => ({
        url: `${GET_CHILD_TICKETS}/${id}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    addChildTickets: builder?.mutation({
      query: ({ id, body }: any) => ({
        url: ADD_CHILD_TICKET,
        method: 'POST',
        params: { id },
        body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteChildTickets: builder?.mutation({
      query: (params: any) => ({
        url: `${DELETE_CHILD_TICKET}`,
        method: 'DELETE',
        params,
      }),
      invalidatesTags: [TAG],
    }),
    getRequester: builder?.query({
      query: (params: any) => ({
        url: `${REQUESTER_LIST}`,
        method: 'GET',
        params,
      }),
    }),
    getServiceCategories: builder?.query({
      query: () => ({
        url: SERVICES_CATEGORIES,
        method: 'GET',
      }),
    }),
    getDepartmentList: builder?.query({
      query: () => ({
        url: DEPARTMENT_LIST,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetChildTicketsQuery,
  useAddChildTicketsMutation,
  useDeleteChildTicketsMutation,
  useLazyGetRequesterQuery,
  useGetRequesterQuery,
  useGetServiceCategoriesQuery,
  useGetDepartmentListQuery,
} = relatedTicketsAPI;
