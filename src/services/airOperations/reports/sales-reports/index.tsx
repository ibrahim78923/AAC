import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const salesReportsApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllSalesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_ASSETS_CONTRACT}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      transformResponse: (response: any) => {
        if (response && response?.data) {
          return {
            ...response,
            list: response?.data?.contracts,
            data: {
              contracts: response?.data?.contracts,
              meta: response?.data?.meta,
            },
          };
        }
      },
    }),
    getAllFavoritesSalesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      transformResponse: (response: any) => {
        if (response && response?.data) {
          return {
            ...response,
            list: response?.data?.inventories,
            data: {
              contracts: response?.data?.inventories,
              meta: response?.data?.meta,
            },
          };
        }
      },
    }),
    getAllDashboardsSalesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER_LIST}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      transformResponse: (response: any) => {
        if (response && response?.data) {
          return {
            ...response,
            list: response?.data?.purchases,
            data: {
              contracts: response?.data?.purchases,
              meta: response?.data?.meta,
            },
          };
        }
      },
    }),
    getAllCustomSalesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ASSETS_SOFTWARE}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      transformResponse: (response: any) => {
        if (response && response?.data) {
          return {
            ...response,
            list: response?.data?.assetssoftwares,
            data: {
              contracts: response?.data?.assetssoftwares,
              meta: response?.data?.meta,
            },
          };
        }
      },
    }),
    restoreSalesReportsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      transformResponse: (response: any) => {
        if (response && response?.data) {
          return {
            ...response,
            list: response?.data?.inventories,
            data: {
              contracts: response?.data?.inventories,
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
} = salesReportsApi;
