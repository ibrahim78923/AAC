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
const TAGONE = 'DASHBOARD_CARDS_TICKETS';
const TAGTWO = 'ANNOUNCEMENTS';
const TAGTHREE = 'DASHBOARD_ANNOUNCEMENTS_CUSTOMER';
const TAGFOUR = 'DASHBOARD_RECENT_ACTIVITIES';
const TAGFIVE = 'DASHBOARD_AGENT_AVAILABILITY';

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
      providesTags: [TAGONE],
    }),
    postAnnouncement: builder.mutation({
      query: (postAnnouncementParameter: any) => ({
        url: `${DASHBOARD_ANNOUNCEMENTS}`,
        method: 'POST',
        body: postAnnouncementParameter?.body,
      }),
      invalidatesTags: [TAGTWO],
    }),
    getCustomerAnnouncement: builder.query({
      query: () => ({
        url: `${DASHBOARD_ANNOUNCEMENTS_CUSTOMER}`,
        method: 'GET',
      }),
      providesTags: [TAGTHREE],
    }),
    getRecentActivities: builder.query({
      query: () => ({
        url: `${DASHBOARD_RECENT_ACTIVITIES}`,
        method: 'GET',
      }),
      providesTags: [TAGFOUR],
    }),
    getDashboardAgent: builder.query({
      query: (params) => ({
        url: `${DASHBOARD_AGENT_AVAILABILITY}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAGFIVE],
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
