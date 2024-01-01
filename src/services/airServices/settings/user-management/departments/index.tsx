import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'DEPARTMENT';

export const departmentAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    postDepartment: builder.mutation({
      query: ({ body }) => ({
        url: `${END_POINTS?.DEPARTMENT}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { usePostDepartmentMutation } = departmentAPI;
