import { OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'DATA_MANAGEMENT_IMPORT';

export const dataManagementImportAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getImportList: builder?.query({
      query: (params) => ({
        url: `${OPERATION?.GET_DATA_MANAGEMENT}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetImportListQuery } = dataManagementImportAPI;
