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
const TAG = 'DASHBOARD_TICKETS';
const TAG_ONE = 'DASHBOARD_CARDS_TICKETS';
const TAG_TWO = 'ANNOUNCEMENTS';
const TAG_THREE = 'DASHBOARD_RECENT_ACTIVITIES';
const TAG_FOUR = 'DASHBOARD_AGENT_AVAILABILITY';

export const dashboardAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTicketsGraph: builder.query({
      query: (params) => ({
        url: `${GET_DASHBOARD_TICKETS}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    getDashboardCardsTickets: builder.query({
      query: () => ({
        url: `${GET_DASHBOARD_CARDS_TICKETS}`,
        method: 'GET',
      }),
      providesTags: [TAG_ONE],
    }),
    postAnnouncement: builder.mutation({
      query: (postAnnouncementParameter: any) => ({
        url: `${DASHBOARD_ANNOUNCEMENTS}`,
        method: 'POST',
        body: postAnnouncementParameter?.body,
      }),
      invalidatesTags: [TAG_TWO],
    }),
    getCustomerAnnouncement: builder.query({
      query: () => ({
        url: `${DASHBOARD_ANNOUNCEMENTS_CUSTOMER}`,
        method: 'GET',
      }),
      providesTags: [TAG_TWO],
    }),
    getRecentActivities: builder.query({
      query: () => ({
        url: `${DASHBOARD_RECENT_ACTIVITIES}`,
        method: 'GET',
      }),
      providesTags: [TAG_THREE],
    }),
    getDashboardAgent: builder.query({
      query: (params) => ({
        url: `${DASHBOARD_AGENT_AVAILABILITY}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG_FOUR],
    }),
  }),
});

export const {
  useLazyGetTicketsGraphQuery,
  useGetDashboardCardsTicketsQuery,
  usePostAnnouncementMutation,
  useGetCustomerAnnouncementQuery,
  useGetRecentActivitiesQuery,
  useGetDashboardAgentQuery,
  useLazyGetDashboardAgentQuery,
} = dashboardAPI;
