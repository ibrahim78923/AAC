import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const salesReportsApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllSalesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getAllFavoritesSalesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getAllDashboardsSalesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getAllCustomSalesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    exportAllSalesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    exportAllFavoritesSalesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    exportAllDashboardsSalesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    exportAllCustomSalesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_GENERIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    restoreSalesReportsList: builder?.query({
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
  useLazyGetAllSalesReportsListQuery,
  useLazyGetAllCustomSalesReportsListQuery,
  useLazyGetAllDashboardsSalesReportsListQuery,
  useLazyGetAllFavoritesSalesReportsListQuery,
  useLazyRestoreSalesReportsListQuery,
  useLazyExportAllSalesReportsListQuery,
  useLazyExportAllCustomSalesReportsListQuery,
  useLazyExportAllDashboardsSalesReportsListQuery,
  useLazyExportAllFavoritesSalesReportsListQuery,
} = salesReportsApi;
