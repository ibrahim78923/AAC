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
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    addReportToFavoriteList: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: ``,
        method: 'PATCH',
        params: apiDataParameter?.queryParams,
      }),
    }),
    renameReports: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: ``,
        method: 'PUT',
        body: apiDataParameter?.body,
      }),
    }),
    addReportsToDashboard: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: ``,
        method: 'PUT',
        body: apiDataParameter?.body,
      }),
    }),
    cloneReports: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: ``,
        method: 'POST',
        params: apiDataParameter?.queryParams,
      }),
    }),
    changeReportOwner: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: ``,
        method: 'PUT',
        params: apiDataParameter?.queryParams,
      }),
    }),
    manageReportAccess: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: ``,
        method: 'PUT',
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
      keepUnusedDataFor: 1,
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
} = salesReportsApi;
