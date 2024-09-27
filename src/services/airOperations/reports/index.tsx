import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const {
  GET_GENERIC_REPORTS,
  EXPORT_GENERIC_REPORTS,
  GET_RESTORE_GENERIC_REPORTS_LIST,
  AUTH_ACCOUNTS,
  GET_SINGLE_GENERIC_REPORT_DETAIL,
  DROPDOWN_USERS,
  GET_AIR_SERVICES_DASHBOARD_LIST,
  TICKET_NEW_EMAIL,
  UPDATE_GENERIC_REPORTS_ACTION,
  CLONE_GENERIC_REPORTS,
  UPDATE_LINK_DASHBOARDS_REPORTS_ACTION,
  RESTORE_DELETED_GENERIC_REPORTS,
  SOFT_DELETE_GENERIC_REPORTS,
  HARD_DELETE_GENERIC_REPORTS,
} = END_POINTS ?? {};

const operationsGenericReportsApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getOperationsReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    exportOperationsReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: EXPORT_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    getOperationsRestoreReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: GET_RESTORE_GENERIC_REPORTS_LIST,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    deleteOperationsMultipleReportsPermanently: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: HARD_DELETE_GENERIC_REPORTS,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
    deleteOperationsMultipleReportsTemporary: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: SOFT_DELETE_GENERIC_REPORTS,
        method: 'PATCH',
        params: apiDataParameter?.queryParams,
      }),
    }),
    restoreOperationsTemporaryDeletedReport: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: RESTORE_DELETED_GENERIC_REPORTS,
        method: 'PATCH',
        params: apiDataParameter?.queryParams,
      }),
    }),
    changeOperationsReportsFavoriteStatus: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: UPDATE_GENERIC_REPORTS_ACTION,
        method: 'PATCH',
        body: apiDataParameter?.body,
        params: apiDataParameter?.queryParams,
      }),
    }),
    renameOperationsReports: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: UPDATE_GENERIC_REPORTS_ACTION,
        method: 'PATCH',
        body: apiDataParameter?.body,
        params: apiDataParameter?.queryParams,
      }),
    }),
    addOperationsReportsToMultipleDashboard: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: UPDATE_LINK_DASHBOARDS_REPORTS_ACTION,
        method: 'PATCH',
        body: apiDataParameter?.body,
        params: apiDataParameter?.queryParams,
      }),
    }),
    cloneOperationsReports: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: CLONE_GENERIC_REPORTS,
        method: 'PATCH',
        params: apiDataParameter?.queryParams,
      }),
    }),
    changeOperationsReportOwner: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: UPDATE_GENERIC_REPORTS_ACTION,
        method: 'PATCH',
        body: apiDataParameter?.body,
        params: apiDataParameter?.queryParams,
      }),
    }),
    manageOperationsReportAccessLevel: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: UPDATE_GENERIC_REPORTS_ACTION,
        method: 'PATCH',
        body: apiDataParameter?.body,
        params: apiDataParameter?.queryParams,
      }),
    }),
    emailOperationsReports: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: TICKET_NEW_EMAIL,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    getOperationsReportsOwnersDropdownListForReports: builder?.query({
      query: ({ params }: any) => ({
        url: DROPDOWN_USERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getOperationsReportsDashboardListsDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: GET_AIR_SERVICES_DASHBOARD_LIST,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.dynamicdashboards;
      },
    }),
    getOperationsReportsUserListDropdownForAccessManagement: builder?.query({
      query: ({ params }: any) => ({
        url: DROPDOWN_USERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getOperationsSingleReportDetailsForDownload: builder?.query({
      query: (apiDataParameter: any) => ({
        url: GET_SINGLE_GENERIC_REPORT_DETAIL,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getAuthAccountsForOperationsReports: builder.query({
      query: () => ({
        url: AUTH_ACCOUNTS,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLazyGetOperationsReportsListQuery,
  useLazyExportOperationsReportsListQuery,
  useLazyGetOperationsRestoreReportsListQuery,
  useDeleteOperationsMultipleReportsPermanentlyMutation,
  useDeleteOperationsMultipleReportsTemporaryMutation,
  useRestoreOperationsTemporaryDeletedReportMutation,
  useChangeOperationsReportsFavoriteStatusMutation,
  useRenameOperationsReportsMutation,
  useAddOperationsReportsToMultipleDashboardMutation,
  useCloneOperationsReportsMutation,
  useChangeOperationsReportOwnerMutation,
  useManageOperationsReportAccessLevelMutation,
  useEmailOperationsReportsMutation,
  useLazyGetOperationsReportsOwnersDropdownListForReportsQuery,
  useLazyGetOperationsReportsDashboardListsDropdownQuery,
  useLazyGetOperationsReportsUserListDropdownForAccessManagementQuery,
  useGetOperationsSingleReportDetailsForDownloadQuery,
  useGetAuthAccountsForOperationsReportsQuery,
} = operationsGenericReportsApi;
