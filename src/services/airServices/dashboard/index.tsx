import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const { GET_DASHBOARD_TICKETS } = END_POINTS;

export const dashboardAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTicketsStatusGraph: builder.query({
      query: () => ({
        url: `${GET_DASHBOARD_TICKETS}?filterBy=status`,
        method: 'GET',
      }),
      providesTags: ['DASHBOARD_TICKETS'],
    }),
    getTicketsPriorityGraph: builder.query({
      query: () => ({
        url: `${GET_DASHBOARD_TICKETS}?filterBy=pirority`,
        method: 'GET',
      }),
      providesTags: ['DASHBOARD_TICKETS'],
    }),
  }),
});

export const {
  useGetTicketsStatusGraphQuery,
  useGetTicketsPriorityGraphQuery
} = dashboardAPI;
