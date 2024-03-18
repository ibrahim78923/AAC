import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CUSTOMER_PORTAL_DASHBOARD';

export const customerPortalDashboardAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getPopularArticles: builder?.query({
      query: (getArticlesParameter: any) => ({
        url: END_POINTS?.KNOWLEDGE_BASE_ARTICLES,
        params: getArticlesParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getRecentTickets: builder?.query({
      query: () => ({
        url: `${END_POINTS?.GET_RECENT_TICKET}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getPendingForApprovalsTickets: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_TICKETS_PENDING_FOR_APPROVAL}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getApprovalTicketsById: builder?.query({
      query: (getSingleTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}/${getSingleTicketParameter?.pathParam?.ticketId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getCustomerDashboardData: builder?.query({
      query: () => ({
        url: `${END_POINTS?.GET_CUSTOMER_DASHBOARD}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getCustomerDashboardAnnouncements: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_CUSTOMER_DASHBOARD_ANNOUNCEMENTS}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getTicketApprovalDetailsById: builder?.query({
      query: (getTicketApprovalDetailsParameter: any) => ({
        url: `${END_POINTS?.GET_TICKET_APPROVAL_DETAILS}`,
        method: 'GET',
        params: getTicketApprovalDetailsParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getTicketDetailsById: builder?.query({
      query: (getTicketDetailsParameter: any) => ({
        url: `${END_POINTS?.TICKET}/${getTicketDetailsParameter?.pathParams?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  useGetPopularArticlesQuery,
  useGetRecentTicketsQuery,
  useGetPendingForApprovalsTicketsQuery,
  useGetApprovalTicketsByIdQuery,
  useGetCustomerDashboardDataQuery,
  useGetCustomerDashboardAnnouncementsQuery,
  useGetTicketApprovalDetailsByIdQuery,
  useGetTicketDetailsByIdQuery,
} = customerPortalDashboardAPI;
