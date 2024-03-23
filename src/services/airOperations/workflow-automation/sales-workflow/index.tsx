import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'WORKFLOWS';
export const salesWorkflowAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getWorkflowList: builder?.query({
      query: (params) => ({
        url: `${END_POINTS?.WORKFLOWS}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useLazyGetWorkflowListQuery } = salesWorkflowAPI;
