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
  }),
});

export const {
  useDeleteRestoreReportPermanentlyMutation,
  useRestoreDeletedReportMutation,
  useDeleteReportTemporaryMutation,
  useLazyExportReportsListQuery,
  useAddReportToFavoriteListMutation,
} = salesReportsApi;
