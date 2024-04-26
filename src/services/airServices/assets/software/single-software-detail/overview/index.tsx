import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const assetsSoftwareOverviewAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getAssetsSoftwareContractUtilization: builder?.query({
      query: (id: any) => ({
        url: `${END_POINTS?.SOFTWARE_CONTRACT_UTILIZATION}/${id}`,
        method: 'GET',
      }),
    }),
    getAssetsSoftwareOverview: builder?.query({
      query: (id: any) => ({
        url: `${END_POINTS?.SOFTWARE_OVERVIEW}/${id}`,
        method: 'GET',
      }),
    }),
    getAssetsSoftwareContractValue: builder?.query({
      query: (id: any) => ({
        url: `${END_POINTS?.SOFTWARE_CONTRACT_VALUE}/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetAssetsSoftwareContractUtilizationQuery,
  useGetAssetsSoftwareContractValueQuery,
  useGetAssetsSoftwareOverviewQuery,
} = assetsSoftwareOverviewAPI;
