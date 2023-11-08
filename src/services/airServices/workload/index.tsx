import { ENDPOINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'WORKLOAD';

export const workloadAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getWorkload: builder.query({
      query: () => ({
        url: `${ENDPOINTS?.WORKLOAD}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetWorkloadQuery } = workloadAPI;
