import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const salesReportsApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    deleteRestoreReportPermanently: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.HARD_DELETE_GENERIC_REPORTS}`,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
    deleteReportTemporary: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.SOFT_DELETE_GENERIC_REPORTS}`,
        method: 'PATCH',
        params: apiDataParameter?.queryParams,
      }),
    }),
    restoreDeletedReport: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.RESTORE_DELETED_GENERIC_REPORTS}`,
        method: 'PATCH',
        params: apiDataParameter?.queryParams,
      }),
    }),
    exportReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.EXPORT_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    addReportToFavoriteList: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.UPDATE_GENERIC_REPORTS_ACTION,
        method: 'PATCH',
        body: apiDataParameter?.body,
        params: apiDataParameter?.queryParams,
      }),
    }),
    renameReports: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.UPDATE_GENERIC_REPORTS_ACTION,
        method: 'PATCH',
        body: apiDataParameter?.body,
        params: apiDataParameter?.queryParams,
      }),
    }),
    addReportsToDashboard: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.UPDATE_LINK_DASHBOARDS_REPORTS_ACTION,
        method: 'PATCH',
        body: apiDataParameter?.body,
        params: apiDataParameter?.queryParams,
      }),
    }),
    cloneReports: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.CLONE_GENERIC_REPORTS,
        method: 'PATCH',
        params: apiDataParameter?.queryParams,
      }),
    }),
    changeReportOwner: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.UPDATE_GENERIC_REPORTS_ACTION,
        method: 'PATCH',
        body: apiDataParameter?.body,
        params: apiDataParameter?.queryParams,
      }),
    }),
    manageReportAccess: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.UPDATE_GENERIC_REPORTS_ACTION,
        method: 'PATCH',
        body: apiDataParameter?.body,
        params: apiDataParameter?.queryParams,
      }),
    }),
    emailReports: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET_NEW_EMAIL}`,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    getAllGenericReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getReportsOwnersDropdownListForReports: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    restoreGenericReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_RESTORE_GENERIC_REPORTS_LIST,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getServicesDashboardDropdownListToAddReportsToDashboard: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_AIR_SERVICES_DASHBOARD_LIST}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.dynamicdashboards;
      },
    }),
    getSalesDashboardDropdownListToAddReportsToDashboard: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.SALES_DASHBOARD_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.salesDashboards;
      },
    }),
    getMarketingDashboardDropdownListToAddReportsToDashboard: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.MARKETING_DASHBOARD_LISTS_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.dynamicdashboards ?? [];
      },
    }),
    getUserAccessListDropdownListForReportsAccessManagement: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getSingleGenericReportDetail: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_SINGLE_GENERIC_REPORT_DETAIL,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getAuthAccountsForOperationsReports: builder.query({
      query: () => ({
        url: `${END_POINTS?.AUTH_ACCOUNTS}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useDeleteRestoreReportPermanentlyMutation,
  useRestoreDeletedReportMutation,
  useDeleteReportTemporaryMutation,
  useLazyExportReportsListQuery,
  useAddReportToFavoriteListMutation,
  useRenameReportsMutation,
  useAddReportsToDashboardMutation,
  useCloneReportsMutation,
  useManageReportAccessMutation,
  useChangeReportOwnerMutation,
  useEmailReportsMutation,
  useLazyGetAllGenericReportsListQuery,
  useLazyGetReportsOwnersDropdownListForReportsQuery,
  useRestoreGenericReportsListQuery,
  useLazyRestoreGenericReportsListQuery,
  useLazyGetMarketingDashboardDropdownListToAddReportsToDashboardQuery,
  useLazyGetSalesDashboardDropdownListToAddReportsToDashboardQuery,
  useLazyGetServicesDashboardDropdownListToAddReportsToDashboardQuery,
  useLazyGetUserAccessListDropdownListForReportsAccessManagementQuery,
  useGetSingleGenericReportDetailQuery,
  useGetAuthAccountsForOperationsReportsQuery,
} = salesReportsApi;
