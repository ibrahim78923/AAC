import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'DEPARTMENT';

export const departmentAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getDepartment: builder?.query({
      query: () => ({
        url: `${END_POINTS?.DEPARTMENT_LIST}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
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

export const { usePostDepartmentMutation, useGetDepartmentQuery } =
  departmentAPI;
