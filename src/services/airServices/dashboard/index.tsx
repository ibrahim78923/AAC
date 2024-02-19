import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const { GET_DASHBOARD_TICKETS,DASHBOARD_ANNOUNCEMENTS } = END_POINTS;

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
    postAnnouncement: builder.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.DASHBOARD_ANNOUNCEMENTS}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ANNOUNCEMENTS'],
    }),
  }),
  
});

export const {
  useGetTicketsStatusGraphQuery,
  useGetTicketsPriorityGraphQuery,
  usePostAnnouncementMutation
} = dashboardAPI;
