import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const {
  GET_DASHBOARD_TICKETS,
  DASHBOARD_ANNOUNCEMENTS,
  DASHBOARD_ANNOUNCEMENTS_CUSTOMER,
  GET_DASHBOARD_CARDS_TICKETS,
  DASHBOARD_RECENT_ACTIVITIES,
  DASHBOARD_AGENT_AVAILABILITY,
  GET_TOP_PERFORMER,
  DASHBOARD_EMAIL,
} = END_POINTS;
const TAG = 'DASHBOARD_TICKETS';
const TAG_ONE = 'DASHBOARD_CARDS_TICKETS';
const TAG_TWO = 'ANNOUNCEMENTS';
const TAG_THREE = 'DASHBOARD_RECENT_ACTIVITIES';
const TAG_FOUR = 'DASHBOARD_AGENT_AVAILABILITY';
const TAG_FIVE = 'DASHBOARD_EMAIL';

export const dashboardAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTicketsGraph: builder?.query({
      query: (params) => ({
        url: `${GET_DASHBOARD_TICKETS}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    getDashboardCardsTickets: builder?.query({
      query: () => ({
        url: `${GET_DASHBOARD_CARDS_TICKETS}`,
        method: 'GET',
      }),
      providesTags: [TAG_ONE],
    }),
    postAnnouncement: builder?.mutation({
      query: (postAnnouncementParameter: any) => ({
        url: `${DASHBOARD_ANNOUNCEMENTS}`,
        method: 'POST',
        body: postAnnouncementParameter?.body,
      }),
      invalidatesTags: [TAG_TWO],
    }),
    postEmailDashboard: builder?.mutation({
      query: (postEmailParameter: any) => ({
        url: `${DASHBOARD_EMAIL}`,
        method: 'POST',
        body: postEmailParameter?.body,
      }),
      invalidatesTags: [TAG_FIVE],
    }),
    getCustomerAnnouncement: builder?.query({
      query: (getCustomerAnnouncementApiParameter: any) => ({
        url: `${DASHBOARD_ANNOUNCEMENTS_CUSTOMER}`,
        method: 'GET',
        params: getCustomerAnnouncementApiParameter?.queryParams,
      }),
      providesTags: [TAG_TWO],
    }),
    getRecentActivities: builder?.query({
      query: () => ({
        url: `${DASHBOARD_RECENT_ACTIVITIES}`,
        method: 'GET',
      }),
      providesTags: [TAG_THREE],
    }),
    getDashboardAgent: builder?.query({
      query: (params) => ({
        url: `${DASHBOARD_AGENT_AVAILABILITY}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG_FOUR],
    }),
    getDashboardTopPerformer: builder?.query({
      query: () => ({
        url: GET_TOP_PERFORMER,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response)
          return response?.data?.find(
            (performer: any) => performer?.topPerformer,
          );
      },
    }),
    //TODO: MVP-2 API's
    getServicesDashboardList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_AIR_SERVICES_DASHBOARD_LIST}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    addSingleServicesDashboard: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.CREATE_AIR_SERVICES_DASHBOARD}`,
        method: 'POST',
        params: apiDataParameter?.queryParams,
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    updateSingleServicesDashboard: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.EDIT_AIR_SERVICES_DASHBOARD}`,
        method: 'PATCH',
        params: apiDataParameter?.queryParams,
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    changeDefaultServicesDashboard: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.EDIT_AIR_SERVICES_DASHBOARD}`,
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteSingleServicesDashboard: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${GET_DASHBOARD_TICKETS}`,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getDashboardOwnersDropdownListForDashboard: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getDashboardNameListDropdownListForDashboard: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_AIR_SERVICES_DASHBOARD_LIST}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.dynamicdashboards;
      },
    }),
    getDashboardUserAccessListDropdownListForDashboard: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getSingleServicesDashboard: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_SINGLE_AIR_SERVICES_DASHBOARD}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
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
  useGetDashboardTopPerformerQuery,
  usePostEmailDashboardMutation,
  useLazyGetServicesDashboardListQuery,
  useDeleteSingleServicesDashboardMutation,
  useLazyGetDashboardNameListDropdownListForDashboardQuery,
  useLazyGetDashboardOwnersDropdownListForDashboardQuery,
  useChangeDefaultServicesDashboardMutation,
  useLazyGetDashboardUserAccessListDropdownListForDashboardQuery,
  useLazyGetSingleServicesDashboardQuery,
  useAddSingleServicesDashboardMutation,
  useUpdateSingleServicesDashboardMutation,
  useGetSingleServicesDashboardQuery,
  useGetDashboardNameListDropdownListForDashboardQuery,
} = dashboardAPI;
