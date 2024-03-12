import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const {
  GET_DASHBOARD_TICKETS,
  DASHBOARD_ANNOUNCEMENTS,
  DASHBOARD_ANNOUNCEMENTS_CUSTOMER,
  GET_DASHBOARD_CARDS_TICKETS,
  DASHBOARD_RECENT_ACTIVITIES,
  DASHBOARD_AGENT_AVAILABILITY,
} = END_POINTS;

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
    getDashboardCardsTickets: builder.query({
      query: () => ({
        url: `${GET_DASHBOARD_CARDS_TICKETS}`,
        method: 'GET',
      }),
      providesTags: ['DASHBOARD_CARDS_TICKETS'],
    }),
    postAnnouncement: builder.mutation({
      query: (postAnnouncementParameter: any) => ({
        url: `${DASHBOARD_ANNOUNCEMENTS}`,
        method: 'POST',
        body: postAnnouncementParameter?.body,
      }),
      invalidatesTags: ['ANNOUNCEMENTS'],
    }),
    getCustomerAnnouncement: builder.query({
      query: () => ({
        url: `${DASHBOARD_ANNOUNCEMENTS_CUSTOMER}`,
        method: 'GET',
      }),
      providesTags: ['DASHBOARD_ANNOUNCEMENTS_CUSTOMER'],
    }),
    getRecentActivities: builder.query({
      query: () => ({
        url: `${DASHBOARD_RECENT_ACTIVITIES}`,
        method: 'GET',
      }),
      providesTags: ['DASHBOARD_RECENT_ACTIVITIES'],
    }),
    getDashboardAgent: builder.query({
      query: () => ({
        url: `${DASHBOARD_AGENT_AVAILABILITY}`,
        method: 'GET',
      }),
      providesTags: ['DASHBOARD_AGENT_AVAILABILITY'],
    }),
  }),
});

export const {
  useGetTicketsStatusGraphQuery,
  useGetTicketsPriorityGraphQuery,
  useGetDashboardCardsTicketsQuery,
  usePostAnnouncementMutation,
  useGetCustomerAnnouncementQuery,
  useGetRecentActivitiesQuery,
  useGetDashboardAgentQuery,
} = dashboardAPI;
