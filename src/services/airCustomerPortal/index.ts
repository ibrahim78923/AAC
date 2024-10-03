import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CUSTOMER_PORTAL_DASHBOARD';

export const customerPortalDashboardAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerPortalDashboardPopularArticles: builder?.query({
      query: (getArticlesParameter: any) => ({
        url: END_POINTS?.KNOWLEDGE_BASE_ARTICLES,
        params: getArticlesParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getCustomerPortalDashboardRecentTickets: builder?.query({
      query: () => ({
        url: `${END_POINTS?.GET_RECENT_TICKET}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getCustomerPortalDashboardPendingForApprovalsTickets: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_TICKETS_PENDING_FOR_APPROVAL}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getCustomerPortalDashboardApprovalTicketsById: builder?.query({
      query: (getSingleTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}/${getSingleTicketParameter?.pathParam?.ticketId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getCustomerPortalDashboardCustomerDashboardData: builder?.query({
      query: () => ({
        url: `${END_POINTS?.GET_CUSTOMER_DASHBOARD}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getCustomerPortalCustomerDashboardAnnouncements: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_CUSTOMER_DASHBOARD_ANNOUNCEMENTS}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getCustomerPortalDashboardTicketApprovalDetailsById: builder?.query({
      query: (getTicketApprovalDetailsParameter: any) => ({
        url: `${END_POINTS?.GET_TICKET_APPROVAL_DETAILS}`,
        method: 'GET',
        params: getTicketApprovalDetailsParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getCustomerPortalDashboardTicketDetailsById: builder?.query({
      query: (getTicketDetailsParameter: any) => ({
        url: `${END_POINTS?.TICKET}/${getTicketDetailsParameter?.pathParams?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  useGetCustomerPortalDashboardPopularArticlesQuery,
  useGetCustomerPortalDashboardRecentTicketsQuery,
  useGetCustomerPortalDashboardPendingForApprovalsTicketsQuery,
  useGetCustomerPortalDashboardApprovalTicketsByIdQuery,
  useGetCustomerPortalDashboardCustomerDashboardDataQuery,
  useGetCustomerPortalCustomerDashboardAnnouncementsQuery,
  useGetCustomerPortalDashboardTicketApprovalDetailsByIdQuery,
  useGetCustomerPortalDashboardTicketDetailsByIdQuery,
} = customerPortalDashboardAPI;
