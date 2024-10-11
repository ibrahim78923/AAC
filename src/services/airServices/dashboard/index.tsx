import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const {
  DASHBOARD_ANNOUNCEMENTS,
  DASHBOARD_ANNOUNCEMENTS_CUSTOMER,
  GET_DASHBOARD_CARDS_TICKETS,
  GET_PUBLIC_DASHBOARD_CARDS_TICKETS,
  GET_AIR_SERVICES_DASHBOARD_LIST,
  CREATE_AIR_SERVICES_DASHBOARD,
  EDIT_AIR_SERVICES_DASHBOARD,
  CHANGE_DEFAULT_AIR_SERVICES_DASHBOARD,
  GET_SINGLE_AIR_SERVICES_DASHBOARD,
  DELETE_SERVICES_DASHBOARD,
  DASHBOARD_EMAIL,
  TICKET_NEW_EMAIL,
  UPDATE_SERVICE_DASHBOARD_ANNOUNCEMENT,
  DELETE_SERVICE_DASHBOARD_ANNOUNCEMENT,
  GET_SINGLE_AIR_SERVICES_PUBLIC_DASHBOARD,
  DROPDOWN_USERS,
  DROPDOWN_DEPARTMENT,
} = END_POINTS ?? {};

const TAG = 'DASHBOARD_TICKETS';
const TAG_TWO = 'ANNOUNCEMENTS';

export const dashboardAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getServicesDashboardTicketsInfoCounts: builder?.query({
      query: () => ({
        url: GET_DASHBOARD_CARDS_TICKETS,
        method: 'GET',
      }),
    }),
    getServicesDashboardList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: GET_AIR_SERVICES_DASHBOARD_LIST,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getServicesDashboardSingleDashboardDetails: builder?.query({
      query: (apiDataParameter: any) => ({
        url: GET_SINGLE_AIR_SERVICES_DASHBOARD,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    addServicesDashboardSingleDashboard: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: CREATE_AIR_SERVICES_DASHBOARD,
        method: 'POST',
        params: apiDataParameter?.queryParams,
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    updateServicesDashboardSingleDashboard: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: EDIT_AIR_SERVICES_DASHBOARD,
        method: 'PATCH',
        params: apiDataParameter?.queryParams,
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    changeServicesDashboardSingleDashboardDefaultStatus: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: CHANGE_DEFAULT_AIR_SERVICES_DASHBOARD,
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteServicesDashboardSingleDashboard: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: DELETE_SERVICES_DASHBOARD,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
    sendServicesDashboardRecurringViaEmail: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: DASHBOARD_EMAIL,
        method: 'POST',
        params: apiDataParameter?.queryParams,
      }),
    }),
    sendServicesDashboardViaEmailOnce: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: TICKET_NEW_EMAIL,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    getServicesDashboardAnnouncementsList: builder?.query({
      query: (getCustomerAnnouncementApiParameter: any) => ({
        url: `${DASHBOARD_ANNOUNCEMENTS_CUSTOMER}`,
        method: 'GET',
        params: getCustomerAnnouncementApiParameter?.queryParams,
      }),
      providesTags: [TAG_TWO],
    }),
    getServicesDashboardSingleAnnouncementDetails: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_SINGLE_SERVICE_DASHBOARD_ANNOUNCEMENT}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    addServicesDashboardSingleAnnouncement: builder?.mutation({
      query: (postAnnouncementParameter: any) => ({
        url: DASHBOARD_ANNOUNCEMENTS,
        method: 'POST',
        body: postAnnouncementParameter?.body,
      }),
    }),
    updateServicesDashboardSingleAnnouncement: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: UPDATE_SERVICE_DASHBOARD_ANNOUNCEMENT,
        method: 'PATCH',
        params: apiDataParameter?.queryParams,
        body: apiDataParameter?.body,
      }),
    }),
    deleteServicesDashboardSingleAnnouncement: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: DELETE_SERVICE_DASHBOARD_ANNOUNCEMENT,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getServicesDashboardDashboardOwnersDropdownList: builder?.query({
      query: ({ params }: any) => ({
        url: DROPDOWN_USERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getServicesDashboardDashboardNameDropdownList: builder?.query({
      query: ({ params }: any) => ({
        url: GET_AIR_SERVICES_DASHBOARD_LIST,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.dynamicdashboards;
      },
    }),
    getServicesDashboardUsersListDropdownForAccess: builder?.query({
      query: ({ params }: any) => ({
        url: DROPDOWN_USERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getServicesDashboardUsersListDropdownList: builder?.query({
      query: ({ params }: any) => ({
        url: DROPDOWN_USERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getServicesDashboardDepartmentsDropdownList: builder?.query({
      query: ({ params }: any) => ({
        url: DROPDOWN_DEPARTMENT,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.departments;
      },
    }),
    getServicesDashboardPublicSingleServicesDashboard: builder?.query({
      query: (apiDataParameter: any) => ({
        url: GET_SINGLE_AIR_SERVICES_PUBLIC_DASHBOARD,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getServicesDashboardPublicDashboardCardsTickets: builder?.query({
      query: (apiDataParameter: any) => ({
        url: GET_PUBLIC_DASHBOARD_CARDS_TICKETS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  useGetServicesDashboardTicketsInfoCountsQuery,
  useLazyGetServicesDashboardListQuery,
  useGetServicesDashboardSingleDashboardDetailsQuery,
  useAddServicesDashboardSingleDashboardMutation,
  useUpdateServicesDashboardSingleDashboardMutation,
  useChangeServicesDashboardSingleDashboardDefaultStatusMutation,
  useDeleteServicesDashboardSingleDashboardMutation,
  useSendServicesDashboardRecurringViaEmailMutation,
  useSendServicesDashboardViaEmailOnceMutation,
  useLazyGetServicesDashboardAnnouncementsListQuery,
  useGetServicesDashboardSingleAnnouncementDetailsQuery,
  useAddServicesDashboardSingleAnnouncementMutation,
  useUpdateServicesDashboardSingleAnnouncementMutation,
  useDeleteServicesDashboardSingleAnnouncementMutation,
  useLazyGetServicesDashboardDashboardOwnersDropdownListQuery,
  useLazyGetServicesDashboardDashboardNameDropdownListQuery,
  useLazyGetServicesDashboardUsersListDropdownForAccessQuery,
  useLazyGetServicesDashboardUsersListDropdownListQuery,
  useLazyGetServicesDashboardDepartmentsDropdownListQuery,
  useGetServicesDashboardPublicSingleServicesDashboardQuery,
  useGetServicesDashboardPublicDashboardCardsTicketsQuery,
} = dashboardAPI;
