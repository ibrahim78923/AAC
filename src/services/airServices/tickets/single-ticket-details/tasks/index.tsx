import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TASK';

export const taskAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getTaskById: builder?.query({
      query: (item: any) => ({
        url: `${END_POINTS?.TASK}?ticketId=${item?.id}`,
        method: 'GET',
        params: item?.queryParams,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useLazyGetTaskByIdQuery } = taskAPI;
