import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const servicesReportsApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllServicesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getAllFavoritesServicesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getAllDashboardsServicesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getAllCustomServicesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    exportAllServicesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    exportAllFavoritesServicesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    exportAllDashboardsServicesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    exportAllCustomServicesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    restoreServicesReportsList: builder?.query({
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
  useLazyGetAllServicesReportsListQuery,
  useLazyGetAllCustomServicesReportsListQuery,
  useLazyGetAllDashboardsServicesReportsListQuery,
  useLazyGetAllFavoritesServicesReportsListQuery,
  useLazyRestoreServicesReportsListQuery,
  useLazyExportAllServicesReportsListQuery,
  useLazyExportAllCustomServicesReportsListQuery,
  useLazyExportAllDashboardsServicesReportsListQuery,
  useLazyExportAllFavoritesServicesReportsListQuery,
} = servicesReportsApi;
