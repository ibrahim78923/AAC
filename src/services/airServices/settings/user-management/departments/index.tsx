import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { transformResponse } from '@/utils/api';

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
        url: `${END_POINTS?.DEPARTMENT_UPDATE}`,
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
        url: `${END_POINTS?.AGENTS_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: [TAG_TWO],
    }),
    getUsersDropdownList: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_TWO],
    }),
    getUsersDropdownListForDepartmentHead: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.USER_LIST}`,
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
  useLazyGetUsersDropdownListQuery,
  useLazyGetUsersDropdownListForDepartmentHeadQuery,
} = departmentAPI;
