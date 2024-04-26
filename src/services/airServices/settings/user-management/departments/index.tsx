import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'DEPARTMENT';
const TAG_TWO = 'USERS_DROPDOWN';

export const departmentAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getServicesDepartmentList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.DEPARTMENT_LIST}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    postDepartment: builder?.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.DEPARTMENT}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    updateDepartment: builder?.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.DEPARTMENT_UPDATE}/{id}`,
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
    }),
    getUsersDropdownListForDepartmentMembers: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_AGENTS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
      providesTags: [TAG_TWO],
    }),
  }),
});

export const {
  usePostDepartmentMutation,
  useLazyGetServicesDepartmentListQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useLazyGetUsersDropdownListForDepartmentMembersQuery,
} = departmentAPI;
