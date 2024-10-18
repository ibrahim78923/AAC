import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSETS_SOFTWARE_OVERVIEW';

export const assetsSoftwareOverviewAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getAssetsSoftwareContractUtilization: builder?.query({
      query: (id: any) => ({
        url: `${END_POINTS?.SOFTWARE_CONTRACT_UTILIZATION}/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getAssetsSoftwareOverview: builder?.query({
      query: (id: any) => ({
        url: `${END_POINTS?.SOFTWARE_OVERVIEW}/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getAssetsSoftwareContractValue: builder?.query({
      query: (id: any) => ({
        url: `${END_POINTS?.SOFTWARE_CONTRACT_VALUE}/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  useGetAssetsSoftwareContractUtilizationQuery,
  useGetAssetsSoftwareContractValueQuery,
  useGetAssetsSoftwareOverviewQuery,
} = assetsSoftwareOverviewAPI;
