import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const marketingReportsApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllMarketingReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getAllFavoritesMarketingReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getAllDashboardsMarketingReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getAllCustomMarketingReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    exportAllMarketingReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.EXPORT_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    exportAllFavoritesMarketingReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.EXPORT_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    exportAllDashboardsMarketingReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.EXPORT_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    exportAllCustomMarketingReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.EXPORT_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    restoreMarketingReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_RESTORE_GENERIC_REPORTS_LIST,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      transformResponse: (response: any) => {
        if (response && response?.data) {
          return {
            ...response,
            list: response?.data?.genericReports,
            data: {
              contracts: response?.data,
              meta: response?.data?.meta,
            },
          };
        }
      },
    }),
  }),
});

export const {
  useLazyGetAllMarketingReportsListQuery,
  useLazyGetAllCustomMarketingReportsListQuery,
  useLazyGetAllDashboardsMarketingReportsListQuery,
  useLazyGetAllFavoritesMarketingReportsListQuery,
  useLazyRestoreMarketingReportsListQuery,
  useLazyExportAllMarketingReportsListQuery,
  useLazyExportAllCustomMarketingReportsListQuery,
  useLazyExportAllDashboardsMarketingReportsListQuery,
  useLazyExportAllFavoritesMarketingReportsListQuery,
} = marketingReportsApi;
