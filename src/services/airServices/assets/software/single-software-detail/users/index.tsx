import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = 'GET-SOFTWARE-USERS-DETAILS';
const TAG_ONE = 'DROPDOWN_CONTRACT';
const TAG_TWO = 'DROPDOWN_USERS';
export const softwareUsers = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getSoftwareUsersDetails: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_SOFTWARE_USER}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    getExportSoftwareUsers: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_SOFTWARE_USER}`,
        method: 'GET',
        params,
        responseHandler: (response: any) => response?.blob(),
      }),
      providesTags: [TAG],
    }),
    getContractDropdownList: builder?.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.CONTRACT_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_ONE],
    }),
    addSoftwareUsers: builder?.mutation({
      query: (params: any) => ({
        url: `${END_POINTS?.ADD_SOFTWARE_USERS}`,
        method: 'POST',
        params,
      }),
      invalidatesTags: [TAG],
    }),
    getUsersDropdownList: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.USERS_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_TWO],
    }),
    allocateContract: builder.mutation({
      query: (params: any) => ({
        url: `${END_POINTS?.ALLOCATE_CONTRACT}`,
        method: 'PUT',
        params,
      }),
      invalidatesTags: [TAG],
    }),
    deallocateContract: builder.mutation({
      query: (params: any) => ({
        url: `${END_POINTS?.DEALLOCATE_CONTRACT}`,
        method: 'PUT',
        params,
      }),
      invalidatesTags: [TAG],
    }),
    removeContract: builder.mutation({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.REMOVE_CONTRACT}/{id}`,
        method: 'DELETE',
        params,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetSoftwareUsersDetailsQuery,
  useLazyGetExportSoftwareUsersQuery,
  useLazyGetContractDropdownListQuery,
  useLazyGetUsersDropdownListQuery,
  useAddSoftwareUsersMutation,
  useDeallocateContractMutation,
  useRemoveContractMutation,
  useAllocateContractMutation,
} = softwareUsers;
