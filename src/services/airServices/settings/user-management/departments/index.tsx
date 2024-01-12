import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'DEPARTMENT';

export const departmentAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getDepartment: builder?.query({
      query: (ap: any) => ({
        url: `${END_POINTS?.DEPARTMENT_LIST}`,
        method: 'GET',
        params: ap?.queryParams,
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
    updateDepartment: builder.mutation({
      query: ({ body, id }) => ({
        url: `${END_POINTS?.DEPARTMENT_UPDATE}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteDepartment: builder?.mutation({
      query: (params: any) => ({
        url: `${END_POINTS?.DEPARTMENT_DELETE}`,
        method: 'DELETE',
        params,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  usePostDepartmentMutation,
  useLazyGetDepartmentQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentAPI;
