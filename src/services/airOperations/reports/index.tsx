import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const salesReportsApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    deleteRestoreReportPermanently: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
    deleteReportTemporary: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
    restoreDeletedReport: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'DELETE',
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
        url: `${END_POINTS?.PRODUCTS_USERS}/${apiDataParameter?.pathParams?.id}`,
        method: 'PATCH',
      }),
    }),
    renameReports: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.EDIT_SOFTWARE_CATEGORY}`,
        method: 'PUT',
        body: apiDataParameter?.body,
      }),
    }),
    addReportsToDashboard: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.EDIT_SOFTWARE_CATEGORY}`,
        method: 'PUT',
        body: apiDataParameter?.body,
      }),
    }),
    cloneReports: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.EDIT_SOFTWARE_CATEGORY}/${apiDataParameter?.pathParams?.id}`,
        method: 'POST',
      }),
    }),
    changeReportOwner: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'PUT',
        params: apiDataParameter?.queryParams,
      }),
    }),
    manageReportAccess: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
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
} = salesReportsApi;
