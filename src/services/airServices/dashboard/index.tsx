import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const {
  GET_DASHBOARD_TICKETS,
  DASHBOARD_ANNOUNCEMENTS,
  DASHBOARD_ANNOUNCEMENTS_CUSTOMER,
  GET_DASHBOARD_CARDS_TICKETS,
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
  }),
});

export const {
  useGetTicketsStatusGraphQuery,
  useGetTicketsPriorityGraphQuery,
  useGetDashboardCardsTicketsQuery,
  usePostAnnouncementMutation,
  useGetCustomerAnnouncementQuery,
} = dashboardAPI;
